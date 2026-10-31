'use client'

import { useCallback, useEffect, useState } from 'react'
import { Download, FileCode2, Globe, GraduationCap, LayoutDashboard, Megaphone, ShoppingCart, Users, CalendarDays, Wand2, Loader2, RefreshCw, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

import { fetchJson, ApiError } from '@/lib/admin-client'
import { PageHeader, SectionCard } from './shared/cards'
import { ACCENT, GREEN, INPUT, MONO, RED } from './shared/styles'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { SolutionCatalogEntry } from '@/lib/factory/solution-catalog'

// AI Software Factory — one brief form in, one deliverable client application out.
// Backed by /api/admin/factory/* (blueprint engine: src/lib/factory/blueprint.ts).

const VERTICALS = ['crm', 'marketing', 'education', 'ecommerce', 'booking', 'realestate', 'support'] as const
const MODULES = ['leads', 'pipeline', 'clients', 'projects', 'invoices', 'payments', 'communications', 'newsletter', 'content', 'analytics', 'chat', 'knowledge', 'portal', 'reviews'] as const

interface AppRow {
  id: string; code: string; name: string; vertical: string; status: string; stage: string
  fileCount: number; totalBytes: number; clientId: string | null; createdAt: string; deliveredAt: string | null
}
interface PlanShape {
  summary: string
  pages: Array<{ path: string; title: string; purpose: string }>
  models: Array<{ name: string; note: string }>
  endpoints: Array<{ method: string; path: string; purpose: string }>
  agents: Array<{ code: string; name: string; purpose: string; approval: boolean }>
  automations: Array<{ code: string; name: string; trigger: string; action: string }>
  acceptanceCriteria: string[]
  notBuilt: string[]
}
interface Detail {
  app: AppRow & { brief: string; plan: string }
  plan: PlanShape | null
  brief: Record<string, unknown> | null
  files: Array<{ id: string; path: string; language: string; bytes: number }>
  events: Array<{ id: string; stage: string; status: string; note: string | null; actor: string | null; createdAt: string }>
}

const STATUS_TONE: Record<string, string> = {
  DRAFT: 'text-slate-400 border-slate-700',
  PLANNED: 'text-[#009FE3] border-[#009FE3]/40',
  BUILT: 'text-[#009FE3] border-[#009FE3]/40',
  PREVIEW: 'text-amber-400 border-amber-500/40',
  APPROVED: 'text-emerald-400 border-emerald-500/40',
  DELIVERED: 'text-emerald-400 border-emerald-500/40',
  FAILED: 'text-red-400 border-red-500/40',
}

export function FactoryView() {
  const [apps, setApps] = useState<AppRow[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [detail, setDetail] = useState<Detail | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [approvalNote, setApprovalNote] = useState('')
  const [catalog, setCatalog] = useState<SolutionCatalogEntry[] | null>(null)
  const [catalogError, setCatalogError] = useState<string | null>(null)
  const [sector, setSector] = useState<'All' | 'Healthcare' | 'Education'>('All')
  const [form, setForm] = useState({
    appName: '', clientName: '', vertical: 'crm' as (typeof VERTICALS)[number],
    modules: ['leads', 'pipeline', 'clients', 'communications'] as string[],
    language: 'EN', currency: 'GBP', primaryColor: '#063B8F', primaryContact: '', notes: '',
  })

  const loadApps = useCallback(async () => {
    try {
      const data = await fetchJson<{ apps: AppRow[] }>('/api/admin/factory/apps')
      setApps(data.apps)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not load generated apps')
    }
  }, [])

  const loadDetail = useCallback(async (id: string) => {
    try {
      setDetail(await fetchJson<Detail>(`/api/admin/factory/apps/${id}`))
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'Could not load the app')
    }
  }, [])

  useEffect(() => { void loadApps() }, [loadApps])
  useEffect(() => {
    let active = true
    fetchJson<{ entries: SolutionCatalogEntry[] }>('/api/admin/factory/solution-catalog')
      .then((data) => { if (active) setCatalog(data.entries) })
      .catch((err) => { if (active) setCatalogError(err instanceof ApiError && err.status === 403 ? 'Available to Super Admin only.' : 'Could not load the solution catalogue.') })
    return () => { active = false }
  }, [])
  useEffect(() => { if (selected) void loadDetail(selected) }, [selected, loadDetail])

  const create = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true); setError(null)
    try {
      await fetchJson('/api/admin/factory/apps', { method: 'POST', body: form })
      toast.success('Blueprint and source scaffold stored. No CI build, preview, deployment, or handover was run.')
      await loadApps()
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Generation failed'
      setError(msg); toast.error(msg)
    } finally { setBusy(false) }
  }

  const act = async (action: string, note?: string) => {
    if (!selected) return
    setBusy(true)
    try {
      await fetchJson(`/api/admin/factory/apps/${selected}`, { method: 'PATCH', body: { action, ...(note ? { note } : {}) } })
      toast.success(`Internal status recorded: ${action}`)
      setApprovalNote('')
      await Promise.all([loadApps(), loadDetail(selected)])
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'Action failed')
    } finally { setBusy(false) }
  }

  const toggleModule = (m: string) =>
    setForm((f) => ({ ...f, modules: f.modules.includes(m) ? f.modules.filter((x) => x !== m) : [...f.modules, m] }))

  const FACTORY_TEMPLATES: Array<{ key: string; title: string; blurb: string; vertical: (typeof VERTICALS)[number]; modules: string[]; icon: React.ReactNode; color: string }> = [
    { key: 'business-website', title: 'Business Website', blurb: '12-page marketing site + blog + contact → lead', vertical: 'crm', modules: ['clients', 'communications', 'content'], icon: <Globe className="size-6" />, color: 'from-[#009FE3] to-[#063B8F]' },
    { key: 'ecommerce', title: 'E-commerce Platform', blurb: 'Catalog • cart • checkout • orders', vertical: 'ecommerce', modules: ['clients', 'projects', 'invoices', 'payments', 'communications'], icon: <ShoppingCart className="size-6" />, color: 'from-emerald-500 to-teal-600' },
    { key: 'crm', title: 'CRM System', blurb: 'Leads → pipeline → 360° clients', vertical: 'crm', modules: ['leads', 'pipeline', 'clients', 'communications', 'analytics'], icon: <Users className="size-6" />, color: 'from-violet-500 to-indigo-600' },
    { key: 'education', title: 'Education Portal', blurb: 'Courses • admissions • student hub', vertical: 'education', modules: ['leads', 'clients', 'projects', 'knowledge', 'portal'], icon: <GraduationCap className="size-6" />, color: 'from-amber-500 to-orange-600' },
    { key: 'booking', title: 'Booking System', blurb: 'Availability • slots • payments', vertical: 'booking', modules: ['clients', 'projects', 'payments', 'communications', 'portal'], icon: <CalendarDays className="size-6" />, color: 'from-rose-500 to-pink-600' },
    { key: 'marketing', title: 'Marketing Automation', blurb: 'Campaigns • email • social queue', vertical: 'marketing', modules: ['newsletter', 'content', 'communications', 'analytics'], icon: <Megaphone className="size-6" />, color: 'from-cyan-500 to-sky-600' },
    { key: 'support', title: 'AI Agent App', blurb: 'Chat • knowledge • agent lanes', vertical: 'support', modules: ['chat', 'knowledge', 'communications'], icon: <Wand2 className="size-6" />, color: 'from-slate-700 to-slate-900' },
    { key: 'saas-dashboard', title: 'SaaS Dashboard', blurb: 'Metrics • tenants • billing', vertical: 'crm', modules: ['analytics', 'invoices', 'payments', 'projects', 'reviews'], icon: <LayoutDashboard className="size-6" />, color: 'from-[#063B8F] to-[#0B1F33]' },
  ]

  const applyTemplate = (tpl: (typeof FACTORY_TEMPLATES)[number]) => {
    setForm((f) => ({
      ...f,
      appName: f.appName || tpl.title,
      vertical: tpl.vertical,
      modules: [...new Set([...tpl.modules])],
      notes: f.notes || `Template: ${tpl.title} — ${tpl.blurb}`,
    }))
    toast.success(`Template "${tpl.title}" applied — edit client/name then generate.`)
    document.getElementById('factory-brief')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title="Application Blueprint Generator"
        description="Turn a brief into a deterministic plan and stored source scaffold that can be reviewed and exported. This tool does not provision, run CI, create a preview environment, deploy, or deliver an application."
      />

      <SectionCard title="Industry solution catalogue" description="Super Admin scope inventory · version 1.0.0. Design-only concepts, not verified or deployable products. Selecting or activating client features is not available here.">
        {catalogError ? <p className="text-sm text-slate-400" role="status">{catalogError}</p> : catalog === null ? <p className="text-sm text-slate-400" role="status">Loading catalogue…</p> : <>
          <label className="text-xs text-slate-400">Filter by sector
            <select value={sector} onChange={(e) => setSector(e.target.value as typeof sector)} className={cn(INPUT, 'ml-3')}>
              <option value="All">All sectors</option><option value="Healthcare">Healthcare</option><option value="Education">Education</option>
            </select>
          </label>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {catalog.filter((item) => sector === 'All' || item.sector === sector).map((item) => (
              <article key={item.id} className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <div className="flex items-center justify-between gap-2"><p className="text-xs font-medium text-sky-300">{item.sector} · v{item.version}</p><span className="rounded-full border border-amber-500/40 px-2 py-1 text-[10px] font-semibold text-amber-300">DESIGN ONLY</span></div>
                <h3 className="mt-3 text-sm font-semibold text-slate-100">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">For: {item.personas.join(', ')}</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-300"><span className="text-slate-400">Proposed: </span>{item.proposedModules.join(' · ')}</p>
              </article>
            ))}
          </div>
        </>}
      </SectionCard>

      <SectionCard title="Fixed starter presets" description="These unversioned UI presets prefill the brief. They generate a stored source scaffold/ZIP, not a provisioned, tenant-isolated, or deployed application.">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FACTORY_TEMPLATES.map((tpl) => (
            <button key={tpl.key} type="button" onClick={() => applyTemplate(tpl)} className="group flex flex-col rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-left transition hover:-translate-y-0.5 hover:border-[#009FE3]/40 hover:bg-slate-900 hover:shadow-[0_8px_20px_rgba(6,59,143,0.12)]">
              <span className={cn('flex size-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow', tpl.color)}>{tpl.icon}</span>
              <span className="mt-3 text-sm font-semibold text-slate-100">{tpl.title}</span>
              <span className="mt-1 text-xs leading-relaxed text-slate-500">{tpl.blurb}</span>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#009FE3]">Use template →</span>
            </button>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="1 · Brief" description="The brief is stored with its blueprint record. It does not create a company tenant, deployment, or running application." id="factory-brief">
        <form onSubmit={create} className="grid gap-3 md:grid-cols-2">
          <label className="text-xs text-slate-400">Application name
            <input required value={form.appName} onChange={(e) => setForm({ ...form, appName: e.target.value })} className={cn(INPUT, 'mt-1 w-full')} placeholder="Northwind Client Hub" />
          </label>
          <label className="text-xs text-slate-400">Client
            <input required value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} className={cn(INPUT, 'mt-1 w-full')} placeholder="Northwind Ltd" />
          </label>
          <label className="text-xs text-slate-400">Vertical
            <select value={form.vertical} onChange={(e) => setForm({ ...form, vertical: e.target.value as (typeof VERTICALS)[number] })} className={cn(INPUT, 'mt-1 w-full')}>
              {VERTICALS.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </label>
          <div className="grid grid-cols-3 gap-2">
            <label className="text-xs text-slate-400">Language
              <select value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })} className={cn(INPUT, 'mt-1 w-full')}>
                <option value="EN">English</option><option value="BN">বাংলা</option><option value="BOTH">Both</option>
              </select>
            </label>
            <label className="text-xs text-slate-400">Currency
              <input value={form.currency} maxLength={3} onChange={(e) => setForm({ ...form, currency: e.target.value.toUpperCase() })} className={cn(INPUT, 'mt-1 w-full')} />
            </label>
            <label className="text-xs text-slate-400">Brand colour
              <input type="color" value={form.primaryColor} onChange={(e) => setForm({ ...form, primaryColor: e.target.value })} className={cn(INPUT, 'mt-1 h-[38px] w-full p-1')} />
            </label>
          </div>
          <label className="text-xs text-slate-400 md:col-span-2">Primary contact
            <input value={form.primaryContact} onChange={(e) => setForm({ ...form, primaryContact: e.target.value })} className={cn(INPUT, 'mt-1 w-full')} placeholder="name@client.com" />
          </label>
          <fieldset className="md:col-span-2">
            <legend className="text-xs text-slate-400">Modules</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {MODULES.map((m) => (
                <button
                  key={m} type="button" onClick={() => toggleModule(m)}
                  aria-pressed={form.modules.includes(m)}
                  className={cn('rounded-full border px-3 py-1 text-xs', form.modules.includes(m) ? 'border-[#009FE3]/50 bg-[#009FE3]/15 text-[#009FE3]' : 'border-slate-700 text-slate-400 hover:border-slate-600')}
                >{m}</button>
              ))}
            </div>
          </fieldset>
          <label className="text-xs text-slate-400 md:col-span-2">Anything the client specifically asked for
            <textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={cn(INPUT, 'mt-1 w-full')} placeholder="Paste the client’s own words. Requests the factory cannot build are listed explicitly in the plan instead of being dropped." />
          </label>
          <div className="md:col-span-2">
            <Button type="submit" disabled={busy} style={{ backgroundColor: ACCENT }}>
              {busy ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Sparkles className="mr-2 size-4" />}
              Generate blueprint & source tree
            </Button>
            {error ? <p className="mt-2 text-xs text-red-400">{error}</p> : null}
          </div>
        </form>
      </SectionCard>

      <SectionCard title="2 · Blueprint records & source files" description={`${apps.length} blueprint record${apps.length === 1 ? '' : 's'} stored. Statuses below are internal records, not proof of a build or external delivery.`}
        actions={<Button variant="outline" size="sm" onClick={() => void loadApps()}><RefreshCw className="mr-1 size-3.5" />Refresh</Button>}>
        {apps.length === 0 ? (
          <p className="text-sm text-slate-500">No blueprint records yet. Generate one above.</p>
        ) : (
          <ul className="divide-y divide-slate-800">
            {apps.map((a) => (
              <li key={a.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
                <button type="button" onClick={() => { setApprovalNote(''); setSelected(a.id) }} className="min-w-0 text-left">
                  <span className="block text-sm font-medium text-slate-200">{a.code} · {a.name}</span>
                  <span className="block text-xs text-slate-500">{a.vertical} · {a.fileCount} stored files · {(a.totalBytes / 1024).toFixed(0)} KB · recorded stage {a.stage}</span>
                </button>
                <span className={cn('rounded-full border px-2 py-0.5 text-[10px] font-semibold', STATUS_TONE[a.status] ?? STATUS_TONE.DRAFT)}>Recorded status: {a.status}</span>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>

      {detail ? (
        <>
          <SectionCard title={`3 · Blueprint: ${detail.app.name}`} description={detail.plan?.summary}
            actions={
              <a href={`/api/admin/factory/apps/${detail.app.id}/export`} className={cn('inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium text-white')} style={{ backgroundColor: GREEN }}>
                <Download className="size-3.5" />Download source ZIP
              </a>
            }>
            <div className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-xs leading-relaxed text-amber-200">
              <strong>Manual lifecycle evidence only.</strong> Existing status/history values are operator records and are not verified build, preview, delivery, or handover evidence. Those operations are not integrated here.
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Pages</h3>
                <ul className="mt-1 space-y-1 text-xs text-slate-400">
                  {(detail.plan?.pages ?? []).map((p) => <li key={p.path}><code className={MONO}>{p.path}</code> — {p.title}: {p.purpose}</li>)}
                </ul>
                <h3 className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Data models</h3>
                <ul className="mt-1 space-y-1 text-xs text-slate-400">
                  {(detail.plan?.models ?? []).map((m) => <li key={m.name}><span className="text-slate-200">{m.name}</span> — {m.note}</li>)}
                </ul>
                <h3 className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Automations</h3>
                <ul className="mt-1 space-y-1 text-xs text-slate-400">
                  {(detail.plan?.automations ?? []).map((a) => <li key={a.code}><span className="text-slate-200">{a.code} {a.name}</span> — when {a.trigger} → {a.action}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Files ({detail.files.length})</h3>
                <ul className="mt-1 max-h-56 space-y-0.5 overflow-y-auto text-xs">
                  {detail.files.map((f) => (
                    <li key={f.id} className="flex items-center justify-between gap-2 text-slate-400">
                      <span className="flex min-w-0 items-center gap-1.5"><FileCode2 className="size-3.5 shrink-0 text-slate-600" /><code className={cn(MONO, 'truncate')}>{f.path}</code></span>
                      <span className="shrink-0 text-slate-600">{f.bytes} B</span>
                    </li>
                  ))}
                </ul>
                <h3 className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Acceptance criteria</h3>
                <ol className="mt-1 list-decimal space-y-1 pl-4 text-xs text-slate-400">
                  {(detail.plan?.acceptanceCriteria ?? []).map((c) => <li key={c}>{c}</li>)}
                </ol>
                <h3 className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Explicitly not built</h3>
                <ul className="mt-1 space-y-1 text-xs" style={{ color: RED }}>
                  {(detail.plan?.notBuilt ?? []).map((n) => <li key={n}>• {n}</li>)}
                </ul>
              </div>
            </div>
            <div className="mt-4 space-y-2 rounded-lg border border-slate-700 bg-slate-900/40 p-3">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-300">Internal review record</h3>
              <p className="text-xs leading-relaxed text-slate-500">This admin-only note records an internal decision. It does not establish client acceptance, test success, deployment, or delivery.</p>
              <label className="block text-xs text-slate-400">Required review note
                <textarea rows={2} value={approvalNote} onChange={(event) => setApprovalNote(event.target.value)} className={cn(INPUT, 'mt-1 w-full')} maxLength={500} placeholder="Summarize what was reviewed and any evidence or limitations." />
              </label>
              <Button variant="outline" size="sm" disabled={busy || approvalNote.trim().length < 3} onClick={() => void act('approve', approvalNote.trim())}>
                Record internal approval
              </Button>
            </div>
            <h3 className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">Operator status history</h3>
            <p className="mt-1 text-xs text-slate-500">Historical entries are status/audit notes; the factory does not independently verify their claims.</p>
            <ul className="mt-1 space-y-1 text-xs text-slate-400">
              {detail.events.map((e) => (
                <li key={e.id}>{new Date(e.createdAt).toLocaleString()} · <span className="text-slate-200">{e.stage}/{e.status}</span> — {e.note} {e.actor ? <span className="text-slate-600">({e.actor})</span> : null}</li>
              ))}
            </ul>
          </SectionCard>
        </>
      ) : null}
    </div>
  )
}
