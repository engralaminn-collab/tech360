# Current state audit — Phase A, preliminary

## Evidence and limitations

Snapshot: TECH360 checkout `engralaminn-collab/tech360`, `arena/55a6a2d3-tech360`, HEAD `7a23429cfabdfdc9fa49be60a15957a78bc345cf`. Remote HEAD `main` matched that commit. At start, `src/app/api/official-info/route.ts`, `src/components/site/IndustryDetailView.tsx`, `src/lib/letterhead.ts` were modified; four files were untracked: `docs/OFFICIAL_BRANDING_BASELINE_2026-10-30.md`, `docs/PREMIUM_EXPERIENCE_BASELINE_2026-10-30.md`, `src/components/site/IndustryExperience.tsx`, `tests/official-information-page.test.ts`. They were retained. Only new audit documentation was added in this phase.

This is not a complete codebase, security, source, provider, infrastructure or live workflow audit. Tests were not run in this phase. Existing documentation and names do not prove functionality. No production access, deployments, installs, migrations, seeds or external messages were performed.

## Three first-party systems

- TECH360: Next 16 / React 19, Prisma 6.19.3 / MySQL, Node 22 (`package.json`, `prisma/schema.prisma`); 199 `route.ts` files, 14 migration directories, 78 test files at this snapshot. `src/app/api/contact/route.ts`, `src/app/api/chat/session/route.ts`, `src/lib/journey.ts`, `src/lib/agents/`, `src/lib/factory/`, and portal/admin APIs are starting points for deeper review. `src/lib/api-guard.ts` implements session/RBAC/CSRF checks when invoked, not proof that all routes or objects are covered. Build runs `prisma migrate deploy`; it was not run.
- ALO: remote `tech360-bd/ALO_WEB_CRM_TECH`, `main` / `b3d62e6ebccfac9be1310984c87349ca473cba40`; `package.json` specifies Node 22, Next 16.4.2, React 19; `prisma/schema.prisma` uses MySQL and contains Student, StudentDocument, Application and marketing models. API directories include `auth`, `documents`, `students`, `marketing`, and `ai-workforce`. Schema names do not prove actual ID compatibility, access controls or storage safety. README says Hostinger ownership/configuration is unverified. No local working tree or database was inspected.
- MarketingOS: remote `engralaminn-collab/MarketingOS`, `main` / `9512e03edd3c8448f97133678730855d76122216`; Node >=22.23.2 <23, Next 16, React 19, Prisma SQLite (`package.json`, `prisma/schema.prisma`). README explicitly says work in progress and unverified publishing/sending disabled. Source directories include CRM, social, workflows and workforce; their operation and tenant boundaries remain unverified. No local working tree or database was inspected.

Both remote repositories' root, package, schema and selected README/API/library/test inventories were inspected through GitHub API; no code was run. Both default branches' remote HEADs were checked by `git ls-remote`. Open PR queries returned empty for all three. GitHub branch-protection queries returned 403; do not infer protection is absent. TECH360 workflow query returned empty. ALO recent runs included a failed Health & Dependency Monitor and a cancelled CI run at HEAD alongside successful monitor/CodeQL runs. MarketingOS at HEAD had failed CI and successful Deploy to VPS and Docker Build & Push workflow results. A successful deploy workflow is not evidence of actual live revision, health or acceptance.

## Deployment and tests

`DEPLOYMENT.md` in TECH360 names a different intended repository, `alaminiubateee969-cmd/tech360`; actual Hostinger linkage and deployment target require owner confirmation. Production backup, deployed SHA, permissions, service configuration and integration status remain unknown. Do not run production build/migration until target identity and recoverable backup are confirmed.

A read-only `npm audit --package-lock-only` against the current TECH360 lockfile returned 17 advisories (16 moderate, 1 high). High: transitive `follow-redirects`, GHSA-mrwp-f3q8-3g9p. Runtime exposure, dependency path and remediation not yet verified. No tests, build, browser, database, external-provider, full lint or authenticated QA were run in this phase. Previous-turn targeted test results are documented separately and do not establish current overall pass.
