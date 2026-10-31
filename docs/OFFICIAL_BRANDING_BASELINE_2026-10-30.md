# Official branding and document workflow: initial evidence

## Scope and identity

This is a targeted audit and implementation slice, not a complete codebase audit or release acceptance. The checkout was on `arena/55a6a2d3-tech360` at `7a23429cfabdfdc9fa49be60a15957a78bc345cf`; `gh repo view` identifies its origin as `engralaminn-collab/tech360`. `DEPLOYMENT.md` names `alaminiubateee969-cmd/tech360` as the intended Hostinger repository. The relationship and actual deployment configuration are unverified. No deploy, migration, seed, outbound message or PDF replacement was performed. Previously modified/untracked files were retained.

## Asset and source inventory

The live official-info endpoint and both supplied PDF URLs were readable via the web page retrieval tool. The endpoint is HTML, not JSON; the PDFs yielded text, but raw live bytes, content-type headers, revision, provenance and owner approval could not be independently validated with that tool. The live HTML exposed an internal `0.0.0.0:3000` URL. Neither this observation nor matching text establishes that live and repository files are byte-identical or legally authoritative.

Tracked repository assets (SHA-256, byte size):

- `public/official/TECH360_Official_A4_Letterhead.pdf`: 1,605,313; `68968d680e0069c69a292e82378a0d66b7e9374cf9582929070c0a237d0c1757`.
- `public/brand/TECH360_Official_A4_Letterhead.pdf`: same size and hash as the above, an existing duplicate; neither was modified.
- `public/official/TECH360-Official-Info.pdf`: 48,369; `759a060ee64358edeb7be8398e02ac1255399bb26a296ee8e6aae61d17832846`.
- `public/brand/tech360-company-pad-design.png`: 1055 × 1491; `6d85601da1261fabae01262c35b878c63e53a443dcd31068320255c9a9540c0c`.
- `public/brand/tech360-company-pad-design-alt.png`: 1055 × 1491; `9c6b3cea3bee2b3771462372c563f93c9eab2ee0f72b95fb484b97524698db4b`.
- `public/brand/tech360-logo-original.jpg`: 432 × 432; `f91d8647776abab8330577c8d2eba267c77bc34cf119caa8567c1e65a014198e`. JPEG has no transparent alpha channel. No enlargement or alteration performed.

The four new branding images and `ENTERPRISE SOFTWARE.docx` / `.pdf` mentioned in the request were not available in the supplied upload directory or found in the repository. The existing repository assets are not evidence of the requested four files. No seal or signature asset was identified by the filename inventory; owner authorization and a comprehensive asset audit remain required. The existing public info PDF's extracted text contains a WhatsApp number, whereas `src/lib/constants.ts` records an owner decision not to publish one. Original PDF preserved; owner review needed before any change to it or its distribution.

## Existing implementation and changes

- `/api/official-info` uses `officialInfoHtml` (`src/lib/letterhead.ts`) to return HTML. It previously built URLs from configuration/request origin and included internal operational instructions. The HTML page now uses relative account links, retains the canonical PDF links, offers a direct info PDF link, removes a WhatsApp contact inconsistent with the recorded owner decision, provides a manual contact-based authenticity enquiry, and discloses that it is HTML. It does not assert automated verification.
- Existing documents use `padHeader`, `PAD_CSS`, and related helpers to **recreate an HTML design**, not to overlay the actual official PDF. Preview (`src/lib/journey.ts`), invoice (`src/lib/invoice-document.ts`), handover and legal print paths need document-specific review. Printing is browser-based; controlled multi-page PDF generation using the actual official PDF is not established. Existing files and print paths were not replaced.
- `/api/contact` implements consent validation, request-id handling and CRM intake; `/api/chat/session` implements consent, request IDs and signed chat-session cookie logic. Their presence is source evidence only, not proof of production integration or end-to-end form-to-chat linkage. Admin and portal document APIs contain role/session checks and upload scanning; object-level isolation and full workflows require tests against a disposable database.
- `src/lib/agents/registry.ts` contains a proposal drafting agent definition. No evidence was found in this focused review that it implements the requested versioned proposal issuance, PDF overlay, seal approval or revocation lifecycle. No signed/sealed output was introduced.
- Existing static public letterhead URL and links were preserved; public distribution authorization must be confirmed by the owner. Internal templates and seals were not added to public assets.

## Verification matrix

| Check | Result | Evidence / limitation |
| --- | --- | --- |
| Live official information endpoint | PASS (read only) | Web retrieval returned HTML; response headers, deployed SHA and factual/legal authority not validated. |
| Live canonical PDFs | PASS (read only) | Both returned extractable text through retrieval; raw hashes and authorization not independently established. |
| Repository PDFs and duplicate comparison | PASS | PDF magic and identical letterhead SHA-256 checked in automated test. Full parsing, print dimensions and authenticity not established. |
| Updated public information HTML | PASS (unit) | Canonical links, relative portal link, limitations and no unwanted number covered by tests; no browser QA. |
| Changed-file lint and diff whitespace | PASS | Targeted ESLint and `git diff --check`. |
| Source-to-live asset integrity | BLOCKED | Raw live bytes and trusted owner hash not available. |
| Actual letterhead PDF overlay, searchable multipage PDF, print fidelity | NOT TESTED / NOT IMPLEMENTED | Existing renderer uses HTML design; no claim of export completion. |
| Proposal generation, versions, approvals, issue/revoke and seal controls | NOT TESTED | Reference documents unavailable; full implementation not established. |
| Chat, leads, client ID, portal RBAC, email, payment and database persistence | NOT TESTED | Code exists in part, no disposable database or provider acceptance verified. |
| Responsive, accessibility, screenshots, full lint/tests/build | NOT TESTED | Build includes migration deployment and was not run against an unverified target. Prior Prisma engine download was blocked by network restrictions. |
| Deployment and production readiness | BLOCKED | Repository/deployment target discrepancy, owner asset approval, backup and release authorization are unresolved. |

Next steps: confirm the repository and Hostinger target; supply the referenced assets and proposal documents; verify public distribution of the blank letterhead and hashes with the owner; audit existing authorization, versioning and storage; then implement PDF composition and workflow in reviewable slices with disposable MySQL, adversarial authorization tests and browser/print QA. Never automatically seal or issue a draft, and do not apply unapproved commercial terms.
