# Voice & Contact Center — Phase 0 audit

Date: 2026-10-31. Scope: read-only source review and a targeted unit test, not a production or full security audit. Checkout `engralaminn-collab/tech360`, branch `arena/55a6a2d3-tech360`, HEAD `7a23429cfabdfdc9fa49be60a15957a78bc345cf`. Pre-existing modified and untracked files were preserved. The deployment document names a different repository; deployed SHA, backup, provider settings, infrastructure, hardware capacity and ALO Labs deployment are unverified.

## Current source evidence

- Next 16, React 19, TypeScript, Prisma 6.19.3 and MySQL: `package.json`, `prisma/schema.prisma`. Build executes `prisma migrate deploy`, so it was not run against an unverified target.
- `src/lib/telephony.ts`: device dial URI, simple call-state transitions, optional httpSMS-style sender, provider state inferred from environment values. This is not evidence of a working PSTN line, registered softphone, live inbound routing or WebRTC.
- `src/app/api/admin/telephony/calls/route.ts`: staff-guarded call-log list and creation; returns `tel:`/`sip:` link. In the inspected POST code, `state.serverCalling === 'AVAILABLE'` returns a notice saying the call is queued, but no provider dispatch is performed by that handler. `telephonyState` treats credential/domain presence as AVAILABLE, not a successful test. **High-priority misleading-status finding; do not represent this as a real server call.** Preserve current code in Phase 0; fix and test after approval.
- `normalizeDialNumber` defaults to UK country code `44`, accepts simplified input and truncates; the call endpoint uses the default. It is unsuitable as an unreviewed Bangladeshi calling policy. Require explicit region, validated E.164 and regression tests before external calls.
- `prisma/schema.prisma` `CallLog` has client/lead references and status but no tenant field. The examined list/update handlers query by call/status/id without tenant filtering. Existing staff RBAC is not proof of cross-tenant isolation. Do not expose these handlers as a multi-tenant voice service before an ownership and migration design is reviewed.
- `src/lib/api-guard.ts` contains session, role, CSRF and rate-limit logic when invoked; route-wide object authorization and privileged MFA enforcement need independent verification. `src/lib/media/studio.ts` contains TTS-provider configuration states and voiceover planning; provider presence does not establish operational Bangla speech, streaming, consent or quality.
- Existing CRM, chat, communications, payments and agent libraries are reuse candidates, not verified contact-center capabilities. No records, recordings, audio models, credentials or live calls were inspected.

## Status and verification

| Area | Status | Evidence / blocker |
|---|---|---|
| Existing pure telephony tests | PASS | `npx tsx --test tests/telephony.test.ts`: 16/16, no outgoing message; npx fetched tsx 4.23.15 into npm cache because local executable was absent. The tests do not test a carrier or the misleading POST notice. |
| API call dispatch notice | FAIL (source review) | Queued notice produced by `route.ts` when environment-derived state says AVAILABLE; no dispatch in handler. |
| Multi-tenant voice isolation | NOT VERIFIED / GAP | `CallLog` and reviewed endpoints lack tenant ownership field/filter. Existing single-business scope not independently established. |
| Server calling, real SIP/PSTN, recordings | NOT TESTED | No provider, accounts, test calls or deployment accessed. |
| Bangla TTS/ASR quality and latency | NOT TESTED | No models, licensed dataset or native-speaker review. |
| DB suite, build, browser, security, load, backups | NOT TESTED | Production target and safe test DB unavailable; no deployment. |
| Bangladesh regulatory applicability | BLOCKED | Applicable current licences, carrier arrangements and legal review need confirmation. |

## Local vs external

Local-only evaluation can run synthetic call-state logic, isolated SIP endpoints, local ASR/TTS models (subject to weights, hardware and licence), simulated event integration and controlled audio datasets. Genuine PSTN calls/phone numbers need an approved carrier/trunk, lawful number provisioning and network connectivity. Hardware, model licences and Bangla quality must not be assumed. Synthetic scenarios must remain clearly labelled, never written as actual call records or billing.

## Evidence and next gate

Review the companion architecture, provider, model and compliance documents. No Phase 1 implementation, production provider configuration, paid acquisition, migration or deployment is authorized by this report. Stop for owner approval.
