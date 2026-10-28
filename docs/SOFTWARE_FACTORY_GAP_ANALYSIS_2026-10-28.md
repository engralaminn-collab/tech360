# BDTECH360 Private Company & Software Factory — Gap Analysis

**Review date:** 2026-10-28  
**Repository:** `engralaminn-collab/tech360`  
**Branch:** `arena/0c360d82-tech360`  
**Review basis:** source tree, routes, Prisma schema/migrations, admin UI, existing factory tests, and local install/type/lint/test attempts. This is a code-review result, not a production-host verification.

## Executive result

The repository contains a substantial single-company business system and an **AI Software Factory starter generator**. It is **not yet** the Company-in-a-Box / reusable self-hosted software-factory platform described in the master prompt. In particular, generated starter projects and customer records must not be confused with isolated company tenants or deployed company applications.

Existing work is retained. The current App Factory stays available for its existing brief → deterministic source scaffold → ZIP workflow. The gaps below are not represented as completed merely because a UI card, schema field, or document exists.

## Existing implementation found

| Capability | Evidence in this checkout | Boundary |
|---|---|---|
| Public company site and lead intake | `src/app`, `src/components/site`, `/api/contact`, CRM models | One BDTECH360 business, not a company-per-tenant control plane. |
| CRM, projects, invoices, communications, approvals | Prisma models and `/api/admin/*` routes | Data is company-global; `Client` is a customer record, not a tenant boundary. |
| Authentication and administrative RBAC | DB-backed sessions, scrypt password hashes, CSRF, role checks in `src/lib/auth.ts`, `src/lib/api-guard.ts`, `src/lib/access-policy.ts` | Roles are platform roles. No company membership/tenant-aware session context. |
| Audit trail | `AuditLog`, `audit()` calls, audit UI/routes | Existing actions are logged; a factory-level company/application/release registry is absent. |
| Integration and communication adapters | `src/lib/telephony.ts`, mail/webhook/social/AI modules, integration UI | Provider configuration is global or single-company; external networks remain provider-dependent. |
| Backups and recovery tooling | `scripts/backup/*`, `/api/admin/backup`, `BackupRecoveryView` | Primarily for the current platform database; not a per-application backup/restore system. A real host restore drill remains environment-dependent. |
| Current App Factory slice | `src/lib/factory/blueprint.ts`, `FactoryView`, `/api/admin/factory/apps/*`, `GeneratedApp*` tables | Deterministically stores a source scaffold and can export a ZIP. It does not create a running isolated company service. State-only build/preview/delivery/handover actions now fail closed; regeneration is blocked to preserve the existing source snapshot. Internal approval requires an operator note. |
| Factory template-like presets | Hard-coded preset cards in `FactoryView.tsx` | UI conveniences only; unversioned and not independently managed library records. The UI now states this explicitly. |
| Existing workflows and agent tooling | Workflow, SOP, skills, jobs, audit and approval modules | Useful reusable capabilities, but not packaged/versioned/released as application modules with dependency-impact analysis. |
| License/dependency guidance | `THIRD_PARTY_NOTICES.md`, dependency guides and source audits | Good starting point. Each future adopted component still needs license and self-hosting review. |

## Master-prompt gap matrix

| Requirement area | Status in current checkout | Main gap / risk |
|---|---|---|
| Separate Software Factory Control Center | **Partial** | App Factory is a single view for generated starter projects; no company registry, module library, environment center, release center, or company-level lifecycle. |
| Company registry and lifecycle | **Missing** | No parent/sister/client company entity, parent relationship, business identity, company admins, contractual/support state, domains, or company definition. |
| Private, versioned template library | **Partial** | A deterministic blueprint and hard-coded presets exist. There is no persisted template identity/version, review/approval, compatibility record, test evidence, or upgrade history. Existing presets are not production-ready application templates. |
| Reusable, independently versioned modules | **Partial** | Modules are strings used by the scaffold generator. No module manifests, version/dependency graph, extension points, or safe impact/upgrade analysis. |
| Company configuration definition | **Missing** | Branding and basic brief values exist only on a generated-app brief; there is no reusable versioned company definition with teams, roles, navigation, workflows, integrations, retention, backup or environment policy. |
| Company creation wizard | **Missing** | Existing form describes a client starter app; it cannot validate and create a company/application configuration. |
| Shared-tenant model (Model A) | **Not safe / unsupported** | Core business models and most routes are not tenant-scoped. A tenant ID in the UI would not enforce isolation. Model A must remain blocked until every relevant query, job, file, search, report, API and integration is tenant-enforced and tested. |
| Dedicated-instance model (Model B) | **Partial / not deployed** | Source ZIP export is present. No reproducible instance provisioning/deployment runner, separate database/storage/secrets/domain, or live app health records are managed by the factory. |
| Application lifecycle and releases | **Partial / blocked** | Existing records and audit events remain. Unsupported build/preview/delivery/handover transitions now return explicit errors; there is no tested build/test, staged migration, deployment approval, release rollback, or per-app monitoring. Historical statuses are shown as unverified records. |
| Engineering workspace | **Partial** | Existing admin logs, approvals, projects, tasks and docs provide reusable pieces. No template/module change request, code/config review, dependency impact, release approval, or app-specific customization record. |
| Integration Hub | **Partial** | Several real adapters and fail-closed provider states exist. No unified company/application-scoped credential/health management; external provider access cannot be replaced where its network is required. |
| Security / privileged factory access | **Partial** | Platform-wide authentication, role checks, CSRF and audit exist. Factory access is admin-gated, but there is no company membership model or explicit time-bound customer-data access grant. |
| Data portability and recovery | **Partial** | Main-platform backup scripts and generated source ZIP exist. Company definitions, per-app databases/files/releases and restore verification are not connected to the factory lifecycle. |
| Dashboard truthfulness | **Improved; platform still partial** | Factory UI now identifies itself as a blueprint/source-scaffold tool, labels historical statuses as operator records, and removes unsupported lifecycle success controls. APIs return 501 for unintegrated build/preview/delivery/handover and 409 for destructive unversioned regeneration. Other infrastructure dashboards still require live adapter verification. |
| Acceptance tests A–H | **Not met** | No two-tenant data plane, provisioning/deployment runner, module-upgrade rollback or per-application restore implementation is present. Existing tests cover the scaffold generator and individual security/business policies instead. |

## Safe implementation plan and dependencies

### Phase 0 — restore a trustworthy baseline (partially complete; Prisma engine remains blocked)

1. Fix source-level lint/test defects and remove misleading generated-app lifecycle success states; retain a record of residual type/database gates.
2. Run deterministic factory and policy tests; distinguish code failures from Prisma engine initialization and unavailable MySQL.
3. Do not apply migrations or deploy anything to a live environment. This pass applied no migrations and made no deployment.

**Dependency:** none. **Acceptance:** clean conflict scan; existing tests and lint/type/build gates pass where the sandbox has the required Prisma engine/database.

### Phase 1 — internally controlled factory control plane (first implementation slice)

1. Add a persistent company registry and versioned company definition. Keep the registry about organization/application metadata; do not copy customer business data into company records.
2. Add persisted template and module manifests with immutable versions, dependency/configuration declarations, explicit maturity and approval metadata. Seed only factual, code-backed starter definitions; do not label scaffolds production-ready.
3. Add application records and an append-only lifecycle/event trail. Validation must report unresolved dependencies, missing approvals and unsupported deployment capabilities. `SHARED_TENANT` is rejected until the data plane is tenant-safe; dedicated deployment remains blocked until a verified runner/environment is configured.
4. Expose an admin-only Software Factory Control Center through existing session/RBAC/CSRF/rate-limit/audit boundaries. Do not grant factory admins automatic access to customer business records.
5. Add a company-creation flow that creates a validated, reusable configuration snapshot and records exactly what has and has not been provisioned.

**Dependencies:** Prisma schema + non-destructive migration; existing session and audit infrastructure. **Acceptance:** company definition can be created, validated, saved, cloned without live data, and viewed only by authorized factory roles; asset versions are immutable; unsupported tenant/deployment paths fail closed.

### Phase 2 — tenant isolation (separate, high-risk project)

Add tenant membership and enforcement across every business table and data path, then test cross-tenant API, file, search, report, integration, webhook and background-job access. This requires careful data migration/backfill, explicit mapping of existing records, and a verified backup/restore plan. It is **not safe to infer or auto-assign** existing customer data to new tenant rows. Shared-tenant activation remains disabled until this work and its migration review are complete.

### Phase 3 — dedicated provisioning and release runner

Choose/verify supported self-hosted infrastructure, artifact storage, secret injection, domain/DNS/TLS approach and operator approvals. Implement reproducible build → acceptance tests → staging → approval → production, with migration planning, health checks, rollback and decommission/export. No live deployment or production migration is run by this code change.

### Phase 4 — per-application operations and recovery

Connect health, logs, integration status, backup scheduling, restore drills, source/config export and release/dependency impact reporting to each verified app instance. A backup is only `VERIFIED` after a restore integrity check.

## Baseline verification recorded before changes

- `npm ci --no-audit --no-fund`: **PASS** (862 packages installed).
- `npm run typecheck`: **FAIL** (103 TypeScript errors at baseline, including missing exported symbols, duplicate declarations, missing imports and partially inconsistent console view types).
- `npm run lint`: **FAIL** (16 undefined JSX/component identifiers).
- `npm test`: **FAIL** (914 tests discovered, 891 passed, 23 failed; the first hard failure is a duplicate `output` declaration in `src/lib/agents/engine.ts`; remaining results are being investigated as part of Phase 0).
- `npm run db:generate`: **BLOCKED in this sandbox** because Prisma attempted to fetch the native schema engine from `binaries.prisma.sh`, a host not available in this environment. No production database or live host is accessed.

These results supersede older repository audit documents that describe a passing build for a different commit. Tests after fixes will be reported separately and will not be represented as production deployment evidence.

## Verification after code changes

- `npm ci --no-audit --no-fund`: **PASS** (862 packages installed).
- `npm run lint`: **PASS**.
- Focused factory, lifecycle-safety, invoice-policy, schema, AI/RBAC, messaging and environment tests: **PASS** (184/184).
- `npm test`: **PARTIAL** (1,020 tests discovered, 1,017 passed, 3 failed at `@prisma/client` initialization in database-workflow/governance test files). These suites require a generated Prisma client and database; no database test or live database was run.
- `npm run typecheck`: **FAIL** (23 residual TypeScript errors). Current failures include missing generated Prisma exports (`Session`, `ChatConversation`, `ChatMessage`) and related generated-client typing fallout in preview seed, marketing and newsletter routes. The Prisma generate attempt is blocked because downloading the schema engine from `binaries.prisma.sh` fails TLS in this sandbox.
- `node scripts/convert-schema-to-mysql.mjs --check`: **PASS** (178 native type annotations).
- `npm run check:conflicts`: **PASS** (1,113 tracked files scanned).
- `git diff --check`: **PASS**.

Phase 0 is therefore **not fully complete**. Lint and focused policy checks pass, but full DB-backed tests and a clean typecheck still need a working Prisma engine/client and disposable MySQL. No migration was applied, no live data was accessed, and no deployment was attempted.
