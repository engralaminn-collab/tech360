# Voice platform security and compliance checklist — Phase 0

This is an engineering checklist, not legal advice or evidence of compliance. Bangladesh permissions depend on the actual business role, licence, carrier and current rules. The BTRC's older 2009 IPTSP guidelines are a starting reference, not confirmation of current law: https://lims.btrc.gov.bd/uploads/service_guideline/IPTSP%20Guideline.pdf. A BTRC fixed-telecom guideline addresses privacy and subscriber safeguards for its applicable licence category; applicability and current status require regulator/counsel confirmation: https://objectstorage.ap-dcc-gazipur-1.oraclecloud15.com/n/axvjbnqprylg/b/V2Ministry/o/office-btrc/2024/12/ed7fe810835b43a8ac5243cfd782bfce.pdf.

## Release blockers

- Obtain written legal/provider review of Bangladesh telecom/service licensing, interconnection, number provisioning, international routing, hosting location, recording/monitoring consent, retention/deletion and emergency calling. Do not assume cross-border or foreign-provider rights.
- Document lawful purpose, consent/disclosure, caller identification, call hours, suppression, opt-out, frequency cap and audit for outbound campaigns. Fail closed when rules are unknown. No deceptive voice impersonation or unapproved automated calling.
- Voice cloning: verifiable voice-owner permission, provenance, least privilege, revocation/deletion, abuse response and lawful identity checks. No third-party voice use without authorization.
- Enforce tenant membership and object-level ownership on every DB query, event, recording and transcript; use protected storage, encryption, short-lived authorized downloads, tenant-scoped encryption where appropriate and cross-tenant adversarial tests. Current `CallLog` has no tenant identifier.
- Add server-side capability separation, privileged MFA policy, session security, CSRF and event signature/replay protection; audit access, exports, configuration and any human monitoring. Ensure recordings start only after applicable consent.
- Isolate SIP media, AI workers and secret stores; restrict egress and tool access; sanitize untrusted transcripts/retrieved documents; no AI authority to perform sensitive actions without confirmation. Review provider contracts and each model/voice licence.
- Test backup/restore, retention, incident response, account deletion, rate limiting, fraud/toll protection and provider failure before staging or production. Store minimal evidence and never put customer audio or secrets in public documents.

Current configuration, exact regulator obligations, security controls and production readiness are unverified. No action in this document authorizes provisioning, migration or external contact.
