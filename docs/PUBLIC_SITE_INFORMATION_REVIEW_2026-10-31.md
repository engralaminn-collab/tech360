# Public site information review — 2026-10-31

This is a partial repository review, not certification that every page, statement, integration or company detail is correct. The site has not been tested in a browser or compared with production in this pass.

## Checked and improved
- Confirmed all 20 industry records reference at least one known service; each has a local illustrative image. Homepage tiles now use the same local industry images.
- Service detail experience describes CRM and automation walkthroughs as illustrative; actual integrations and benefits require project-specific verification.
- Shared CTA, footer, selected homepage/pricing, process, services and FAQ wording now treats payment, preview and source handover as contract-specific, and no longer promises 24/7 chat in the footer.
- Original official PDFs remain unchanged. Two focused official-information tests passed; this is not identity or public-authorisation verification.

## Important unresolved information
- Legal policy entries in `src/data/site.ts` and other remaining page text and diagrams contain blanket preview/payment/handover statements, fixed dates or fees and other claims; they were not rewritten in this pass. They may conflict with the updated promotional wording. Owner/legal review and approved canonical contract language are required before publication.
- Company registration, contact details, public document accuracy/authorisation and any claims about availability, providers, support, compliance or customer outcomes are not independently verified. Do not infer verification from their presence in the code.
- Local UI concepts and AI-generated visuals do not establish deployed product capabilities or client success. Real educational institution profiles require owner-provided approved information.
- Page-by-page content, links, accessibility, responsiveness, images and provider behaviour remain incompletely assessed. Prisma generation and full typecheck were previously blocked, and the standard build includes `prisma migrate deploy`; no production database, browser testing or deployment was performed.

## Test evidence
Targeted content, asset and official-document tests: 10 passed on 2026-10-31. These include source-level checks and do not prove authenticated API, clinical compliance or production behaviour. `git diff --check` passed.

## Follow-up in this session
Selected process, About, client portal and funnel copy were adjusted to describe contract-specific review and release conditions, without changing legal policy entries or server-side gates. The portal's previous claim that handover unlocks automatically was removed; release remains subject to actual system controls. Other promotional and legal content still needs review and may conflict.

Installed locked dependencies with lifecycle scripts disabled. Targeted ESLint for modified site components, data and focused tests passed; 10 targeted content/document tests passed. A local Next.js development server returned HTTP 200 for `/` and the education image. This is a development preview only, not visual/browser, end-to-end, database or production validation. The local server used no migration or deployment command.
