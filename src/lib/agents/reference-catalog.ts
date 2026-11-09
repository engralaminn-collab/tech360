/** Operator reference inventory, not an integration registry. No external code is loaded. */
export type AgentReference = { repository: string; capability: string; reportedLicense: string; status: 'NOT_INTEGRATED' }

export const AGENT_REFERENCES: readonly AgentReference[] = [
  { repository: "morluto/rea", capability: "Reverse-engineering analysis", reportedLicense: "MIT", status: 'NOT_INTEGRATED' },
  { repository: "network-tocoder/Local-REA-Reverse-Engineering-125B-16GB-GPU", capability: "Local reverse-engineering experiment", reportedLicense: "unverified", status: 'NOT_INTEGRATED' },
  { repository: "anthropics/claude-plugins-official", capability: "Coding and security plugin catalogue", reportedLicense: "Apache-2.0", status: 'NOT_INTEGRATED' },
  { repository: "ruvnet/ruflo", capability: "Multi-agent orchestration", reportedLicense: "MIT", status: 'NOT_INTEGRATED' },
  { repository: "android/skills", capability: "Android development skills", reportedLicense: "Apache-2.0", status: 'NOT_INTEGRATED' },
  { repository: "K-Dense-AI/scientific-agent-skills", capability: "Scientific research skills", reportedLicense: "MIT", status: 'NOT_INTEGRATED' },
  { repository: "anomalyco/opencode", capability: "Coding agent", reportedLicense: "MIT", status: 'NOT_INTEGRATED' },
  { repository: "HKUDS/CLI-Anything", capability: "Desktop application automation", reportedLicense: "Apache-2.0", status: 'NOT_INTEGRATED' },
  { repository: "cursor/plugins", capability: "Plugin catalogue", reportedLicense: "unverified", status: 'NOT_INTEGRATED' },
  { repository: "bisque-cloud/presenter", capability: "Narrated presentations", reportedLicense: "MIT", status: 'NOT_INTEGRATED' },
  { repository: "pvjbuilds/delegate-router", capability: "Model task routing", reportedLicense: "MIT", status: 'NOT_INTEGRATED' },
  { repository: "R8rly/show", capability: "Content-rating standard", reportedLicense: "CC-BY-SA-4.0", status: 'NOT_INTEGRATED' },
  { repository: "anshuxinha/karpathy-skills-extended", capability: "Coding clarification skills", reportedLicense: "MIT", status: 'NOT_INTEGRATED' },
  { repository: "aerovato/container", capability: "Agent workspaces", reportedLicense: "BSD-3-Clause", status: 'NOT_INTEGRATED' },
  { repository: "D4Vinci/Scrapling", capability: "Web data extraction", reportedLicense: "BSD-3-Clause", status: 'NOT_INTEGRATED' },
  { repository: "langgenius/dify", capability: "AI workflow and RAG platform", reportedLicense: "NOASSERTION", status: 'NOT_INTEGRATED' },
  { repository: "every-app/open-seo", capability: "SEO analysis", reportedLicense: "MIT", status: 'NOT_INTEGRATED' },
  { repository: "mutonby/openshorts", capability: "Short-form video generation", reportedLicense: "MIT", status: 'NOT_INTEGRATED' },
  { repository: "presenton/presenton", capability: "Presentation generation", reportedLicense: "Apache-2.0", status: 'NOT_INTEGRATED' },
  { repository: "debpalash/VoiceStudio", capability: "Voice generation and cloning", reportedLicense: "AGPL-3.0", status: 'NOT_INTEGRATED' },
  { repository: "cloudflare/security-audit-skill", capability: "Security audit skills", reportedLicense: "MIT", status: 'NOT_INTEGRATED' },
  { repository: "anthropics/knowledge-work-plugins", capability: "Knowledge work plugins", reportedLicense: "Apache-2.0", status: 'NOT_INTEGRATED' },
  { repository: "Panniantong/Agent-Reach", capability: "Internet research", reportedLicense: "MIT", status: 'NOT_INTEGRATED' },
  { repository: "metabase/metabase", capability: "Business analytics", reportedLicense: "NOASSERTION", status: 'NOT_INTEGRATED' },
  { repository: "paperless-ngx/paperless-ngx", capability: "Document management", reportedLicense: "GPL-3.0", status: 'NOT_INTEGRATED' },
  { repository: "invoiceninja/invoiceninja", capability: "Invoicing", reportedLicense: "NOASSERTION", status: 'NOT_INTEGRATED' },
  { repository: "dubinc/dub.link", capability: "Link attribution", reportedLicense: "NOASSERTION", status: 'NOT_INTEGRATED' },
  { repository: "gitroomhq/postiz-app", capability: "Social scheduling", reportedLicense: "AGPL-3.0", status: 'NOT_INTEGRATED' },
  { repository: "jamiepine/voicebox", capability: "Voice generation and cloning", reportedLicense: "MIT", status: 'NOT_INTEGRATED' },
  { repository: "KDE/kdenlive", capability: "Video editing", reportedLicense: "GPL-3.0", status: 'NOT_INTEGRATED' },
  { repository: "harry0703/MoneyPrinterTurbo", capability: "Automated video generation", reportedLicense: "MIT", status: 'NOT_INTEGRATED' },
  { repository: "obsproject/obs-studio", capability: "Recording and streaming", reportedLicense: "GPL-2.0", status: 'NOT_INTEGRATED' },
  { repository: "wassgha/rescript", capability: "Transcript-based media editing", reportedLicense: "NOASSERTION", status: 'NOT_INTEGRATED' },
]

/** Bounded, case-insensitive discovery over this local, fixed inventory only. */
export function searchAgentReferences(query: string): AgentReference[] {
  const term = query.trim().toLowerCase().slice(0, 100)
  return AGENT_REFERENCES.filter((item) => !term || `${item.repository} ${item.capability}`.toLowerCase().includes(term))
}
