import { randomUUID } from 'node:crypto'
import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { guard, isResponse } from '@/lib/api-guard'
import { sanitizeText, audit } from '@/lib/security'
import { normalizeBrief, buildPlan, buildFiles, summarizeFiles, assertNoSecrets, type FactoryBrief } from '@/lib/factory/blueprint'

export const dynamic = 'force-dynamic'

// AI Software Factory — generated client applications.
// One brief form in, one reviewed Next.js + Prisma + Tailwind project out,
// stored file-by-file so it can be reviewed, exported and handed over.
export async function GET(req: NextRequest) {
  const g = await guard(req, { minRole: 'ADMIN' })
  if (isResponse(g)) return g

  const url = new URL(req.url)
  const q = sanitizeText(url.searchParams.get('q') ?? '', 80)
  const status = sanitizeText(url.searchParams.get('status') ?? '', 24).toUpperCase()
  const vertical = sanitizeText(url.searchParams.get('vertical') ?? '', 24).toLowerCase()

  const apps = await db.generatedApp.findMany({
    where: {
      ...(status ? { status } : {}),
      ...(vertical ? { vertical } : {}),
      ...(q ? { OR: [{ name: { contains: q } }, { code: { contains: q } }, { clientId: { contains: q } }] } : {}),
    },
    orderBy: { createdAt: 'desc' },
    take: 100,
  })
  return Response.json({ apps, total: apps.length })
}

export async function POST(req: NextRequest) {
  const g = await guard(req, { minRole: 'ADMIN' })
  if (isResponse(g)) return g

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>
  const brief: FactoryBrief = normalizeBrief({
    appName: body.appName,
    clientName: body.clientName,
    vertical: body.vertical,
    modules: body.modules,
    language: body.language,
    currency: body.currency,
    primaryColor: body.primaryColor,
    primaryContact: body.primaryContact,
    notes: body.notes,
  })

  const plan = buildPlan(brief)
  const files = buildFiles(brief, plan)
  const secrets = assertNoSecrets(files)
  if (!secrets.ok) {
    // Hard stop: a generated file must never carry credential-shaped content.
    return Response.json({ error: `Generated file ${secrets.path} contains secret-like content — generation aborted.` }, { status: 500 })
  }
  const { fileCount, totalBytes } = summarizeFiles(files)

  const clientId = sanitizeText(body.clientId ?? '', 40).trim() || null
  const projectId = sanitizeText(body.projectId ?? '', 40).trim() || null
  // A project is never attached without its owning client. GeneratedApp has
  // no database foreign keys, so verify this before writing any source files.
  if (projectId && !clientId) {
    return Response.json({ error: 'A client is required when linking a project.' }, { status: 400 })
  }
  if (clientId) {
    const client = await db.client.findFirst({ where: { id: clientId, deletedAt: null }, select: { id: true } })
    if (!client) return Response.json({ error: 'Client not found.' }, { status: 404 })
  }
  if (projectId) {
    const project = await db.project.findFirst({
      where: { id: projectId, clientId: clientId!, deletedAt: null },
      select: { id: true },
    })
    if (!project) return Response.json({ error: 'Project not found for this client.' }, { status: 404 })
  }

  // A random identifier avoids count-based collisions during concurrent requests
  // and never reuses an existing code when historical records are removed.
  const code = `AF-${randomUUID()}`
  // The schema has no relations for this archive. All three writes must still
  // succeed together: a failed file/event write must not leave a partial app.
  const app = await db.$transaction(async (tx) => {
    const created = await tx.generatedApp.create({
      data: {
        code,
        name: brief.appName,
        clientId,
        projectId,
        vertical: brief.vertical,
        brief: JSON.stringify(brief),
        plan: JSON.stringify(plan),
        status: 'PLANNED',
        stage: 'PLAN',
        fileCount,
        totalBytes,
        createdBy: g.user.email,
      },
    })
    await tx.generatedAppFile.createMany({
      data: files.map((f) => ({ appId: created.id, path: f.path, language: f.language, bytes: Buffer.byteLength(f.content, 'utf8'), content: f.content })),
    })
    await tx.generatedAppEvent.create({
      data: {
        appId: created.id,
        stage: 'PLAN',
        status: 'PLANNED',
        note: `Blueprint generated for ${brief.clientName}: ${plan.pages.length} pages, ${plan.models.length} models, ${plan.endpoints.length} endpoints, ${fileCount} files.`,
        actor: g.user.email,
      },
    })
    return created
  })

  await audit({ actor: g.user.email, action: 'FACTORY_APP_GENERATED', userId: g.user.id, details: `${code} ${brief.appName} (${brief.vertical}) → ${fileCount} files` })

  return Response.json({ app, plan, fileCount, totalBytes }, { status: 201 })
}
