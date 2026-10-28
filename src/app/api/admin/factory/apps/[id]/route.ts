import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { guard, isResponse } from '@/lib/api-guard'
import { sanitizeText, audit } from '@/lib/security'
import { getUnsupportedFactoryAction } from '@/lib/factory/lifecycle-policy'

export const dynamic = 'force-dynamic'

type Stage = 'BRIEF' | 'PLAN' | 'SCAFFOLD' | 'PREVIEW' | 'DELIVERY' | 'HANDOVER'
type Status = 'DRAFT' | 'PLANNED' | 'BUILT' | 'PREVIEW' | 'APPROVED' | 'DELIVERED' | 'FAILED'

const TRANSITIONS: Record<string, { stage: Stage; status: Status; note: string; requiresAdmin?: boolean }> = {
  approve: {
    stage: 'PLAN',
    status: 'APPROVED',
    note: 'Internal approval recorded by an operator after review; this is not client acceptance.',
    requiresAdmin: true,
  },
  fail: {
    stage: 'PLAN',
    status: 'FAILED',
    note: 'Operator-reported issue recorded; build or runtime failure is not independently verified.',
  },
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const g = await guard(req, { minRole: 'ADMIN' })
  if (isResponse(g)) return g
  const { id } = await params

  const app = await db.generatedApp.findUnique({ where: { id: sanitizeText(id, 40) } })
  if (!app) return Response.json({ error: 'Generated app not found.' }, { status: 404 })

  const [files, events] = await Promise.all([
    db.generatedAppFile.findMany({ where: { appId: app.id }, select: { id: true, path: true, language: true, bytes: true }, orderBy: { path: 'asc' } }),
    db.generatedAppEvent.findMany({ where: { appId: app.id }, orderBy: { createdAt: 'desc' }, take: 50 }),
  ])

  return Response.json({
    app,
    plan: safeParse(app.plan),
    brief: safeParse(app.brief),
    files,
    events,
    exportUrl: `/api/admin/factory/apps/${app.id}/export`,
  })
}

function safeParse(value: string): unknown {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const g = await guard(req, { minRole: 'ADMIN' })
  if (isResponse(g)) return g
  const { id } = await params

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>
  const action = sanitizeText(body.action ?? '', 20).toLowerCase()
  const note = sanitizeText(body.note ?? '', 500).trim()
  const unsupportedAction = getUnsupportedFactoryAction(action)
  if (unsupportedAction) return Response.json({ error: unsupportedAction.message }, { status: unsupportedAction.status })

  const transition = TRANSITIONS[action]
  if (!transition) return Response.json({ error: `Unknown action “${action}”.` }, { status: 400 })
  if ((action === 'approve' || action === 'fail') && note.length < 3) {
    return Response.json({ error: 'Add an operator note before recording this internal decision.' }, { status: 400 })
  }
  if (transition.requiresAdmin && !['ADMIN', 'SUPER_ADMIN'].includes(String(g.user.role))) {
    return Response.json({ error: 'Internal approval is an admin action.' }, { status: 403 })
  }

  const app = await db.generatedApp.findUnique({ where: { id: sanitizeText(id, 40) } })
  if (!app) return Response.json({ error: 'Generated app not found.' }, { status: 404 })
  if (app.status === 'DELIVERED') {
    return Response.json({ error: 'This record has a legacy DELIVERED status. The factory cannot verify or advance that record; use the separate approved delivery/handover workflows when applicable.' }, { status: 409 })
  }

  const updated = await db.generatedApp.update({
    where: { id: app.id },
    data: { stage: transition.stage, status: transition.status },
  })

  await db.generatedAppEvent.create({
    data: { appId: app.id, stage: transition.stage, status: transition.status, note: note || transition.note, actor: g.user.email },
  })
  await audit({ actor: g.user.email, action: `FACTORY_APP_${action.toUpperCase()}`, userId: g.user.id, details: `${app.code} → ${transition.status}` })

  return Response.json({ app: updated, transition: { action, ...transition } })
}
