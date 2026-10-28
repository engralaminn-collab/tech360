'use client'

import { ArrowRight, CircleAlert, CircleCheck, LockKeyhole, ServerOff, ShieldAlert } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const CAPABILITIES = [
  {
    name: 'Starter source generation and ZIP export',
    status: 'In repository',
    tone: 'blue',
    detail: 'The existing App Factory creates a deterministic client-project scaffold. It does not provision a running company or service.',
    evidence: 'src/lib/factory/blueprint.ts · /api/admin/factory/apps',
  },
  {
    name: 'Generated-app lifecycle and release records',
    status: 'Partial',
    tone: 'amber',
    detail: 'Records and lifecycle labels exist, but the controls do not execute a build, test, deploy, health check, or rollback.',
    evidence: 'GeneratedApp models · src/components/admin/FactoryView.tsx',
  },
  {
    name: 'Private versioned templates and modules',
    status: 'Not implemented',
    tone: 'slate',
    detail: 'Current presets are UI conveniences; there is no immutable versioned library, dependency graph, or approval history.',
    evidence: 'Factory presets and blueprint source',
  },
  {
    name: 'Company registry and reusable configuration',
    status: 'Not implemented',
    tone: 'slate',
    detail: 'The database does not contain the company, company-admin, application, or versioned company-definition records required by the specification.',
    evidence: 'Prisma schema · current platform RBAC',
  },
  {
    name: 'Shared-tenant deployment',
    status: 'Blocked for safety',
    tone: 'red',
    detail: 'Business records and routes are not tenant-scoped. No tenant identifier in the UI can provide server-side isolation.',
    evidence: 'Requires a separately reviewed data-model and enforcement project',
  },
  {
    name: 'Dedicated provisioning, releases, and per-app recovery',
    status: 'Not implemented',
    tone: 'slate',
    detail: 'There is no verified provisioning runner, staged release/rollback system, or per-application backup and restore drill.',
    evidence: 'Current backup tooling covers the platform, not generated applications',
  },
] as const

const TONE: Record<(typeof CAPABILITIES)[number]['tone'], string> = {
  blue: 'border-sky-400/30 bg-sky-400/10 text-sky-200',
  amber: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
  slate: 'border-slate-500/30 bg-slate-500/10 text-slate-300',
  red: 'border-red-400/30 bg-red-400/10 text-red-200',
}

function StatusIcon({ tone }: { tone: (typeof CAPABILITIES)[number]['tone'] }) {
  if (tone === 'blue') return <CircleCheck className="size-4 text-sky-300" aria-hidden="true" />
  if (tone === 'red') return <ShieldAlert className="size-4 text-red-300" aria-hidden="true" />
  if (tone === 'amber') return <CircleAlert className="size-4 text-amber-300" aria-hidden="true" />
  return <ServerOff className="size-4 text-slate-400" aria-hidden="true" />
}

export function SoftwareFactoryControlView({ onOpenAppFactory }: { onOpenAppFactory: () => void }) {
  return (
    <div className="mx-auto max-w-6xl space-y-6 text-slate-100">
      <header className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5 sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="border-sky-400/30 bg-sky-400/10 text-sky-200">Repository assessment</Badge>
          <span className="text-xs text-slate-400">Reviewed 28 October 2026</span>
        </div>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Software Factory Control</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
          This is a source-code readiness summary, not a live infrastructure or production-health dashboard. The existing App Factory is preserved; company provisioning and deployment are not represented as complete.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button onClick={onOpenAppFactory} className="bg-sky-600 text-white hover:bg-sky-500">
            Open existing App Factory <ArrowRight className="ml-2 size-4" aria-hidden="true" />
          </Button>
          <div className="inline-flex items-center gap-2 rounded-lg border border-amber-400/25 bg-amber-400/5 px-3 py-2 text-xs text-amber-100">
            <LockKeyhole className="size-4 shrink-0" aria-hidden="true" />
            Shared-tenant creation remains blocked until server-side isolation is implemented and tested.
          </div>
        </div>
      </header>

      <section aria-labelledby="factory-capabilities-heading">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 id="factory-capabilities-heading" className="text-lg font-semibold">Capability status</h2>
            <p className="mt-1 text-xs text-slate-400">Status is based on repository code review; no live environment was inspected.</p>
          </div>
          <span className="text-xs text-slate-500">Source: docs/SOFTWARE_FACTORY_GAP_ANALYSIS_2026-10-28.md</span>
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          {CAPABILITIES.map((capability) => (
            <article key={capability.name} className="rounded-xl border border-slate-700 bg-slate-900/50 p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-slate-100">{capability.name}</h3>
                <Badge variant="outline" className={TONE[capability.tone]}>
                  <StatusIcon tone={capability.tone} />
                  <span className="ml-1.5">{capability.status}</span>
                </Badge>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{capability.detail}</p>
              <p className="mt-3 border-t border-slate-700/70 pt-3 text-[11px] leading-5 text-slate-500">Evidence: {capability.evidence}</p>
            </article>
          ))}
        </div>
      </section>

      <aside className="rounded-xl border border-slate-700/70 bg-slate-900/30 p-4 text-sm leading-6 text-slate-300">
        <strong className="text-slate-100">Safe next implementation boundary:</strong> metadata-only company registry and immutable template/module manifests, with audited admin access. Do not copy customer records, assign existing data to tenants, run migrations against production, or trigger deployments as part of this readiness view.
      </aside>
    </div>
  )
}
