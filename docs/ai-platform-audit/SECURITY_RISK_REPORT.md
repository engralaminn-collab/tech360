# Security risks and unknowns

- **Confirmed dependency signal:** `npm audit --package-lock-only` reported 17 advisories including high `follow-redirects` GHSA-mrwp-f3q8-3g9p. Exploitability not established. Review dependency path and patched lockfile with regression tests.
- **Production identity unknown:** TECH360 deployment docs name a different repository. A successful GitHub deployment job in MarketingOS is not live health proof. Gate any deployment on verified target, backups and approval.
- **REA is not a sandbox:** untrusted artifacts and provider execution must be isolated. No production secrets, unrestricted file paths, network, shell or package install; use evidence provenance and quotas. Prompt injection is a data-boundary risk, not a finding of an exploit.
- **Tenant and object ownership:** guard/session code exists; route-by-route and cross-tenant checks remain unverified across three systems. Prioritize negative authorization tests, CSRF, download controls and signed webhook validation.
- **ALO student data:** preserve `AE-YYYYNNNNN` and legacy IDs; format implementation and secure storage not yet verified. No migration, export or production access until approved and tested on disposable copy.
- **Outbound services and credentials:** provider configuration and consent not verified. Avoid outbound sends, client secrets in logs and agent access to credentials; provider keys remain server-side.
- **Licensing and supply chain:** GitHub licence metadata is not legal review; AGPL/source-available projects and model/media assets require independent assessment. No untrusted install scripts were run.
- **Availability:** branch-protection API returned 403; CI results contain failures or cancellations. Read-only audit cannot certify backups, monitoring, RPO/RTO or recovery.
