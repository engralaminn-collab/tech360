import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { guard, isResponse } from '@/lib/api-guard'
import { acceptedMethodsPhrase } from '@/lib/features'
import { hasCapability } from '@/lib/access-policy'
import { sendCommunication } from '@/lib/comms'
import {
  GovernanceDeniedError,
  ensureGovernedApproval,
  executeGoverned,
  findApprovedGovernedApproval,
} from '@/lib/governance/enforce'
import { classifyOutbound, outboundContentHash, recipientHash } from '@/lib/governance/outbound'
import { DOCUMENT_HTML_HEADERS, renderInvoiceDocumentHtml, renderInvoiceEmailBodyHtml } from '@/lib/invoice-document'
import {
  canTransitionInvoiceStatus,
  computeInvoiceSettlement,
  parseStoredLineItems,
  resolveInvoiceTotalMinor,
} from '@/lib/invoice-policy'
import { audit, readJson, sanitizeText } from '@/lib/security'

export const dynamic = 'force-dynamic'

// ============================================================
// ADMIN SINGLE INVOICE LIFECYCLE
//   GET   /api/admin/invoices/[number] → JSON or a printable invoice
//   PATCH /api/admin/invoices/[number] → submit_for_approval | approve | issue |
//                                        send | mark_overdue | void | cancel |
//                                        mark_disputed
// ============================================================

export async function GET(req: NextRequest, { params }: { params: Promise<{ number: string }> }) {
  const g = await guard(req, { capability: 'finance.read', capabilityOnly: true })
  if (isResponse(g)) return g

  const { number } = await params
  const cleanNumber = sanitizeText(number, 40)
  const invoice = await db.invoice.findUnique({
    where: { number: cleanNumber },
    include: {
      client: { select: { id: true, clientId: true, name: true, businessName: true, email: true, country: true } },
      project: { select: { id: true, code: true, name: true } },
      payments: { orderBy: { createdAt: 'desc' }, include: { receipt: { select: { receiptNumber: true } } } },
      refundCases: { orderBy: { createdAt: 'desc' } },
    },
  })
  if (!invoice) return Response.json({ error: 'Invoice not found.' }, { status: 404 })

  const totalMinor = resolveInvoiceTotalMinor({ totalMinor: invoice.totalMinor, amount: invoice.amount })
  const settlement = computeInvoiceSettlement({
    invoiceAmount: invoice.amount,
    invoiceTotalMinor: totalMinor,
    currentStatus: invoice.status,
    dueAt: invoice.dueAt,
    payments: invoice.payments,
  })

  if (req.nextUrl.searchParams.get('format') === 'html') {
    const html = renderInvoiceDocumentHtml(
      { ...invoice, status: settlement.nextStatus, totalMinor, paidMinor: settlement.paidMinor, remainingMinor: settlement.remainingMinor },
      await acceptedMethodsPhrase(),
    )
    return new Response(html, { status: 200, headers: DOCUMENT_HTML_HEADERS })
  }

  return Response.json({
    invoice: {
      ...invoice,
      effectiveStatus: settlement.nextStatus,
      totalMinor,
      paidMinor: settlement.paidMinor,
      remainingMinor: settlement.remainingMinor,
      paidAmount: settlement.paidAmount,
      remainingAmount: settlement.remainingAmount,
      parsedLineItems: parseStoredLineItems(
        invoice.lineItems,
        invoice.description || invoice.customerNotes || invoice.notes || 'Software engineering & delivery services',
        totalMinor,
      ),
    },
  })
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ number: string }> }) {
  const g = await guard(req, { capability: 'finance.invoice.write', capabilityOnly: true })
  if (isResponse(g)) return g

  const { number } = await params
  const cleanNumber = sanitizeText(number, 40)
  const raw = await readJson(req)
  const action = (sanitizeText(raw.action, 40) || '').toLowerCase()
  const reason = sanitizeText(raw.reason, 1000)
  const requestedApprovalId = sanitizeText(raw.approvalId, 40) || null

  const invoice = await db.invoice.findUnique({
    where: { number: cleanNumber },
    include: {
      client: { select: { id: true, clientId: true, name: true, businessName: true, email: true, whatsapp: true, phone: true, country: true } },
      project: { select: { id: true, code: true, name: true } },
      payments: { select: { id: true, amount: true, status: true, verifiedAt: true, createdAt: true } },
    },
  })
  if (!invoice) return Response.json({ error: 'Invoice not found.' }, { status: 404 })

  if (action === 'send') return sendInvoice(g, invoice, requestedApprovalId)

  const targetStatus: Record<string, string> = {
    submit_for_approval: 'AWAITING_APPROVAL',
    approve: 'APPROVED',
    issue: 'ISSUED',
    mark_overdue: 'OVERDUE',
    void: 'VOID',
    cancel: 'CANCELLED',
    mark_disputed: 'DISPUTED',
  }
  const nextStatus = targetStatus[action]
  if (!nextStatus) {
    return Response.json({ error: 'Unsupported invoice action.' }, { status: 400 })
  }

  const privilegedActions = new Set(['approve', 'issue', 'mark_overdue', 'void', 'cancel', 'mark_disputed'])
  if (privilegedActions.has(action) && g.user.role !== 'SUPER_ADMIN') {
    return Response.json({ error: 'This invoice action requires a Super Admin.' }, { status: 403 })
  }
  if (action === 'submit_for_approval' && !hasCapability(g.user, 'finance.invoice.write')) {
    return Response.json({ error: 'Invoice write permission is required.' }, { status: 403 })
  }
  if (!canTransitionInvoiceStatus(invoice.status, nextStatus)) {
    return Response.json({ error: `Invoice cannot move from ${invoice.status} to ${nextStatus}.` }, { status: 409 })
  }

  const now = new Date()
  if (action === 'mark_overdue') {
    const settlement = computeInvoiceSettlement({
      invoiceAmount: invoice.amount,
      invoiceTotalMinor: invoice.totalMinor,
      currentStatus: invoice.status,
      dueAt: invoice.dueAt,
      now,
      payments: invoice.payments,
    })
    if (!invoice.dueAt || invoice.dueAt.getTime() >= now.getTime() || settlement.remainingMinor <= 0 || settlement.nextStatus !== 'OVERDUE') {
      return Response.json({ error: 'The invoice is not currently overdue based on its due date and verified payments.' }, { status: 409 })
    }
  }
  if ((action === 'void' || action === 'cancel' || action === 'mark_disputed') && !reason) {
    return Response.json({ error: 'A reason is required for this invoice action.' }, { status: 400 })
  }
  if (action === 'issue' && invoice.status !== 'APPROVED') {
    return Response.json({ error: 'Only an approved invoice can be issued.' }, { status: 409 })
  }
  if (action === 'approve' && !['DRAFT', 'AWAITING_APPROVAL'].includes(invoice.status)) {
    return Response.json({ error: 'Only a draft or awaiting-approval invoice can be approved.' }, { status: 409 })
  }

  const data: Record<string, unknown> = { status: nextStatus, updatedAt: now }
  if (action === 'approve') {
    data.approvedBy = g.user.id
    data.approvedAt = now
  }
  if (action === 'issue') data.issuedAt = now
  if (action === 'void' || action === 'cancel') {
    data.voidedAt = now
    data.voidReason = reason
  }

  const transition = await db.$transaction(async (tx) => {
    const changed = await tx.invoice.updateMany({
      where: { id: invoice.id, status: invoice.status },
      data,
    })
    if (changed.count !== 1) return { changed: false as const, invoice: null }

    const updated = await tx.invoice.findUnique({ where: { id: invoice.id } })
    await tx.auditLog.create({
      data: {
        actor: g.user.email,
        userId: g.user.id,
        action: `INVOICE_${action.toUpperCase()}`,
        entityType: 'Invoice',
        entityId: invoice.id,
        clientId: invoice.client.clientId,
        projectId: invoice.projectId,
        details: JSON.stringify({ number: invoice.number, from: invoice.status, to: nextStatus, reason: reason || undefined }).slice(0, 8000),
        ip: g.ip,
      },
    })
    return { changed: true as const, invoice: updated }
  })
  if (!transition.changed) {
    return Response.json({ error: 'Invoice changed during this request; reload and review its current state.' }, { status: 409 })
  }
  return Response.json({ ok: true, invoice: transition.invoice, message: `Invoice ${invoice.number} moved to ${nextStatus}.` })
}

type InvoiceForSend = Parameters<typeof renderInvoiceDocumentHtml>[0] & {
  id: string
  projectId: string | null
  dueAt: Date | null
  sentAt: Date | null
  payments: Array<{ id: string; amount: number; status: string; verifiedAt: Date | null; createdAt: Date }>
  client: Parameters<typeof renderInvoiceDocumentHtml>[0]['client'] & { id: string }
}

async function sendInvoice(
  g: Exclude<Awaited<ReturnType<typeof guard>>, Response>,
  invoice: InvoiceForSend,
  requestedApprovalId: string | null,
): Promise<Response> {
  if (!['ISSUED', 'SENT', 'VIEWED', 'PARTIAL', 'OVERDUE'].includes(invoice.status)) {
    return Response.json({ error: 'Only an issued invoice can be emailed.' }, { status: 409 })
  }
  const recipient = invoice.billingEmail || invoice.client.email
  if (!recipient) return Response.json({ error: 'This client has no billing email address.' }, { status: 400 })

  const subject = `Invoice ${invoice.number} from TECH360`
  const settlement = computeInvoiceSettlement({
    invoiceAmount: invoice.amount,
    invoiceTotalMinor: invoice.totalMinor,
    currentStatus: invoice.status,
    dueAt: invoice.dueAt,
    payments: invoice.payments,
  })
  if (settlement.remainingMinor <= 0 || settlement.nextStatus === 'PAID') {
    return Response.json({ error: 'This invoice is fully settled and no longer needs an invoice email.' }, { status: 409 })
  }
  const html = renderInvoiceEmailBodyHtml(
    { ...invoice, status: settlement.nextStatus, paidMinor: settlement.paidMinor, remainingMinor: settlement.remainingMinor },
    await acceptedMethodsPhrase(),
  )
  const policy = classifyOutbound(html, subject)
  const resourceKey = `comm:${outboundContentHash({ channel: 'EMAIL', to: recipient, subject, body: html })}`
  const approvalId = requestedApprovalId || (await findApprovedGovernedApproval('communication.send', resourceKey))
  let consumedApprovalId: string | undefined

  try {
    await executeGoverned(
      {
        action: 'communication.send',
        actor: { type: 'HUMAN', id: g.user.id, role: g.user.role },
        resourceKey,
        approvalId,
        clientId: invoice.client.id,
        projectId: invoice.projectId,
      },
      async () => ({}),
    )
    consumedApprovalId = approvalId ?? undefined
  } catch (error) {
    if (error instanceof GovernanceDeniedError && error.code === 'APPROVAL_REQUIRED') {
      const pendingId = await ensureGovernedApproval({
        action: 'communication.send',
        requestedBy: g.user.id,
        resourceKey,
        clientId: invoice.client.id,
        projectId: invoice.projectId,
        title: `Email invoice ${invoice.number} to ${invoice.client.clientId}`,
        description: 'Sending an invoice is a consequential communication. A Super Admin must approve the exact rendered invoice and recipient before anything is sent.',
        extraPayload: { channel: 'EMAIL', recipientHash: recipientHash(recipient), categories: policy.categories, carriesAmount: policy.carriesAmount, invoiceNumber: invoice.number },
      })
      await audit({ actor: g.user.email, userId: g.user.id, action: 'INVOICE_EMAIL_GATED', entityType: 'Invoice', entityId: invoice.id, clientId: invoice.client.clientId, details: { approvalId: pendingId }, ip: g.ip })
      return Response.json({
        ok: false,
        status: 'ADMIN_APPROVAL_REQUIRED',
        approvalId: pendingId,
        error: 'A Super Admin approval is required for this exact invoice email. Nothing was sent.',
      }, { status: 409 })
    }
    if (error instanceof GovernanceDeniedError) {
      return Response.json({ ok: false, status: 'GOVERNANCE_DENIED', code: error.code, error: 'Governance refused the invoice email. Nothing was sent.' }, { status: 409 })
    }
    throw error
  }

  const { communicationId, result } = await sendCommunication({
    clientId: invoice.client.id,
    channel: 'EMAIL',
    to: recipient,
    subject,
    body: html,
    agentCode: 'MANUAL',
    workflowId: 'INVOICE_SEND',
    approvalId: consumedApprovalId,
  })

  const accepted = result.status === 'SENT' || result.status === 'SENT_PLATFORM'
  const targetStatus = settlement.nextStatus === 'ISSUED' ? 'SENT' : settlement.nextStatus
  let invoiceStatusUpdated = false
  let invoiceStatusUpdateError: string | null = null
  if (accepted && (invoice.status === targetStatus || canTransitionInvoiceStatus(invoice.status, targetStatus))) {
    const acceptedAt = new Date()
    try {
      invoiceStatusUpdated = await db.$transaction(async (tx) => {
        const changed = await tx.invoice.updateMany({
          where: { id: invoice.id, status: invoice.status },
          data: { status: targetStatus, sentAt: invoice.sentAt ?? acceptedAt, updatedAt: acceptedAt },
        })
        if (changed.count !== 1) return false
        await tx.auditLog.create({
          data: {
            actor: g.user.email,
            userId: g.user.id,
            action: 'INVOICE_STATUS_PROVIDER_ACCEPTED',
            entityType: 'Invoice',
            entityId: invoice.id,
            clientId: invoice.client.clientId,
            projectId: invoice.projectId,
            details: JSON.stringify({ number: invoice.number, from: invoice.status, to: targetStatus, communicationId }).slice(0, 8000),
            ip: g.ip,
          },
        })
        return true
      })
    } catch {
      invoiceStatusUpdateError = 'Provider accepted the email, but the invoice status update failed; reconcile the invoice before retrying.'
    }
  }
  await audit({
    actor: g.user.email,
    userId: g.user.id,
    action: accepted ? 'INVOICE_EMAIL_PROVIDER_ACCEPTED' : 'INVOICE_EMAIL_SEND_REFUSED',
    entityType: 'Invoice',
    entityId: invoice.id,
    clientId: invoice.client.clientId,
    projectId: invoice.projectId ?? undefined,
    details: {
      number: invoice.number,
      status: result.status,
      communicationId,
      invoiceStatusUpdated,
      providerError: result.error ? result.error.slice(0, 240) : undefined,
      invoiceStatusUpdateError: invoiceStatusUpdateError ?? undefined,
    },
    ip: g.ip,
  })
  return Response.json({
    ok: accepted,
    status: result.status,
    communicationId,
    invoiceStatusUpdated,
    message: accepted
      ? invoiceStatusUpdated
        ? `Provider accepted invoice ${invoice.number}; email delivery is not confirmed by the provider.`
        : `Provider accepted invoice ${invoice.number}; its lifecycle status did not update. Check the current invoice before retrying.`
      : `Invoice was not sent (${result.status}).`,
    error: result.error ?? invoiceStatusUpdateError,
  })
}
