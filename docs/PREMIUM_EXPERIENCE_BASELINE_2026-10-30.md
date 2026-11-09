# Premium experience: initial implementation and baseline

## Repository and safety

- Inspected checkout: `engralaminn-collab/tech360`, branch `arena/55a6a2d3-tech360`, HEAD `7a23429cfabdfdc9fa49be60a15957a78bc345cf`. The supplied brief names a different repository; equivalence has not been verified.
- Working tree was clean at the start. Existing routes, data, migrations and workflows were not removed or reset.
- No production access, database migration, seed, deployment, external message or provider purchase was performed.

## Evidence from this checkout

- Public pages use the existing client-side view router (`src/app/page.tsx`) with path resolution via `src/app/[...path]/page.tsx`. Industry data is in `src/data/site.ts`; existing industry detail pages use representative images and clearly labelled hypothetical scenarios.
- Public images are referenced through `src/data/images.json`; a complete rights/licence audit has not been performed. The supplied reference images have not been added as assets.
- The contact page submits to `/api/contact` with consent and a request ID. A separate chat widget uses `/api/chat/session` and `/api/chat/messages`. Their existence does not establish a linked form-to-chat flow, verified account activation, provider availability, or production acceptance. These require end-to-end review.
- Admin includes a factory view and factory APIs; their presence does not establish a versioned, isolated solution library or deployable vertical applications. Existing documentation describes scaffold output.
- The industries listing contains wording implying an HTML preview before any payment. Existing business-policy tests also describe payment gates. Contract-specific terms need an explicit review; neither should be generalized to every agreement without validating the applicable policy and scope.
- Production database, backups, deployed revision, integrations, authenticated workflows, actual asset licences and live-site screenshots were not verified in this session.

## First vertical presentation slice

`IndustryExperience` adds a keyboard-operable module selector and native HTML workflow visualization to the existing hospitals/clinics, travel/hospitality and schools/training detail pages. All scenarios are labelled Concept, disclose their limitations, and link to the existing consultation route. They do not store or process actual patient, booking or student data. This is a presentation concept, not a functional business platform, clinical system or reusable template.

## Verification

- PASS: ESLint on both changed components; `git diff --check`; `npm run test:business` (18 tests).
- BLOCKED: Prisma generation attempted but the environment cannot access `binaries.prisma.sh` to download the schema engine. Typecheck fails with missing Prisma generated types and downstream errors; a clean typecheck after generation is not established.
- NOT RUN: full lint, full tests, database suite, production build, browser screenshots, responsive/accessibility testing and authenticated QA. The build script includes `prisma migrate deploy`, so it was deliberately not run against an unverified database.
- No new package dependency or third-party media was added. `npm ci` used the existing lockfile.

## Remaining delivery gates

This is a small first slice, not completion of P0–P7. Audit routes and licences; validate real browser visuals and accessibility; develop the remaining public pages and four verticals including CRM; implement and test secure linked intake/chat, account activation and human-reviewed proposal flow; design and validate the versioned library and isolation model; review contractual payment/handover rules; then run disposable MySQL, security, full regression, release and rollback checks with explicit approval. Do not mark concepts as verified implementations without corresponding evidence.
