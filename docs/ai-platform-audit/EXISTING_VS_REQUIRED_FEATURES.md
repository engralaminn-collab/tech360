# Existing versus required — evidence and gaps

| Requirement | Observed source | Status / next verification |
|---|---|---|
| Inquiry and consent | TECH360 `src/app/api/contact/route.ts` | Code exists; end-to-end persistence and idempotency require disposable-DB tests. |
| Chat and client matching | `src/app/api/chat/session/route.ts`, `src/lib/chat-session.ts` | Session and onboarding code observed; linkage, ownership and human escalation not verified. |
| SOW, approvals, invoice and payment | Prisma models and `src/lib/journey.ts`; admin APIs | Models/routes exist; contract-specific sequencing and full lifecycle need integration tests. |
| Preview, delivery and acceptance | Prisma Preview, Delivery, HandoverRecord; `src/app/api/handover` | Code exists; secure object access and complete workflow unverified. |
| Workforce | `src/lib/agents/` and AiAgent/AgentJob models | Definitions and execution code exist; permissions, model availability and quotas require tests. |
| Software intelligence | REA documented separately | Authorized registration, isolation, provenance storage and review UI require development. |
| Marketing | TECH360 social APIs; MarketingOS source and README | Overlap is apparent at model/route level; real provider capability and safe reuse unverified. |
| ALO student records | Remote Student / StudentDocument models | ID compatibility, privacy, existing data and deployment unverified; preserve in place. |
| Official branded PDFs | Existing HTML renderers and PDFs | Actual official PDF overlay, issuance authorization and verification remain unimplemented/unverified; see earlier document audit. |
