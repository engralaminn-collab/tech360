# Voice Contact Center — phased implementation roadmap

**Current gate: Phase 0 only. Stop and obtain owner approval before Phase 1.** This roadmap proposes work, not evidence of implemented features.

0. Audit and requirements: preserve existing code; document misleading provider status and multi-tenant gaps, legal/provider uncertainty, hardware and backup requirements; obtain owner and relevant regulatory/legal review.
1. Foundation in isolated development: define tenants, roles and object ownership, non-destructive reviewed migrations and rollback; audit, idempotency, quotas, provider contracts and fail-closed states. First add tests showing cross-tenant denial and correct NOT_CONFIGURED / unverified status. Preserve existing single-business data and migration compatibility; test only on disposable MySQL.
2. Telephony lab: choose PBX by an Asterisk/FreeSWITCH comparison; synthetic SIP, event reconciliation, IVR, queues, WebRTC and human handoff. No PSTN or real numbers until separate permission and provider legal acceptance.
3. Speech lab: licence review, consented Bangla dataset, ASR/TTS benchmark, model packaging and latency tests. Do not enable voice cloning without the required consent controls.
4. AI agent: streaming VAD/ASR/orchestrator/TTS, interruptions, scoped tools, escalation and verified transfer, never fabricated results.
5. Human contact center and CRM: tenant-scoped workspace, secure recordings, existing CRM adapters, approved omnichannel routes and evidence-backed analytics.
6. SaaS billing: idempotent usage ledger, reconciliation, reviewed rates, invoices and authorization; no invented costs or settlements.
7. Validation: adversarial tenant/authorization tests, legal review, real provider test under separate approval, load/latency, native-speaking Bangla evaluation, recovery rehearsal and release approval.

Each phase requires named owners, defined acceptance tests, security review, capability flags, observability, migrations tested on a safe copy and rollback. Disabling a new adapter must not modify existing records or stop existing CRM. No production deployment, outbound sends or paid purchase without a separate gate.
