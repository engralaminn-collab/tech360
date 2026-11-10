# TECH360 Client Protection Operations Runbook

**Prepared:** 2026-11-11  
**Scope:** Refunds, payments, source handover, deletion, ownership, recurring charges, independent operation, warranty, and company/portfolio verification.  
**Status:** Operational runbook and verification checklist. It is not evidence that a production deployment or every external provider has been configured.

## 1. Mandatory commercial sequence

The standard customer journey is:

1. Enquiry and discovery. No payment.
2. Final Scope of Work (SOW) drafted and approved in writing.
3. HTML preview supplied and reviewed. Preview-stage in-scope revisions are handled as stated in the SOW.
4. Client approves the SOW and preview in writing.
5. TECH360 issues the invoice for 100% of the agreed project fee.
6. Finance verifies cleared payment using provider evidence or an authorised reconciliation.
7. Production development begins.
8. QA and client review are completed against the approved SOW and preview.
9. Source package is released only after the full amount due has been verified.
10. Client confirms receipt, deployment/function, and credential rotation.
11. Warranty period and optional support terms are recorded.

A different milestone schedule is permitted only when all amounts, triggers, due dates, and refund treatment are expressly written in the SOW and accepted before payment. Never display a generic 40/30/30 schedule as the standard model.

## 2. Refund and cancellation operations

### Existing code evidence
- Refund cases are stored as `RefundCase` records and can be queried/created through `src/app/api/admin/refunds/route.ts`.
- Case review, approval, rejection, and settlement are handled through `src/app/api/admin/refunds/[id]/route.ts`.
- Refund settlement uses the governed `refund.settle` action. A Super Admin approval is required before settlement; the money-state update and approval consumption share a transaction.
- Cumulative refund limits are checked against the linked payment, and project/invoice/payment balances are recalculated.

### Finance operator checklist
- Match the case to Client ID, project, invoice, and original verified payment.
- Calculate: cleared payments received minus the agreed value of completed work minus only pre-approved, evidenced, non-recoverable third-party costs.
- Attach an itemised calculation and evidence notes to the case.
- Mark the case under review and record the decision.
- Obtain the governed Super Admin approval for settlement.
- Initiate the actual refund with the original payment provider or bank. Do not assume the CRM API itself moves money.
- Record the provider refund reference and actual settlement date; only then mark the case settled.
- Provide the client with the decision and evidence. Target initiation is within 14 business days after approval.

**Important:** The current refund route records and reconciles refund settlement state; verify provider-side money movement separately. Do not claim automatic Stripe, PayPal, or SSLCommerz refunds unless a provider refund adapter and acceptance test exist.

## 3. Payment security

- A browser success redirect, screenshot, or client message is not settlement evidence.
- Stripe settlement requires the verified webhook path and matching amount/currency.
- Manual methods require Finance verification against provider/bank evidence.
- PayPal and SSLCommerz remain unbuilt unless code and sandbox acceptance evidence prove otherwise.
- Never enable an unbuilt gateway or represent a configuration flag as an operational integration.
- Keep credentials in the approved server environment/secret store, not source files, frontend bundles, workflow JSON, or public repositories.
- Reconcile duplicate, mismatched, replayed, and unknown transactions before marking paid.

## 4. Source handover

### Existing code evidence
- Handover records, package tokens, source-package manifest validation, and a full-payment gate exist.
- The client confirmation endpoint requires explicit receipt, working-condition, and password-change answers after download.
- Package manifest validation checks file identity, project/client association, file hashes, scan state, and package size.

### Operator checklist
- Confirm approved SOW and all change requests.
- Confirm full cleared payment and no unresolved payment reversal that suspends release.
- Verify package contents against the SOW; exclude internal secrets, other-client data, and unrelated credentials.
- Generate and verify the manifest; retain its digest and delivery evidence.
- Release through the controlled handover route only.
- Ask the client to deploy/test, rotate temporary passwords, enable MFA, and review access.
- Record client receipt, functionality result, password rotation response, and any reported issue.

## 5. Source-copy deletion and evidence

The public policy defines the following retention targets for new engagements:
- Active TECH360-controlled development copies: remove within 30 calendar days after successful handover confirmation or project closure.
- Residual encrypted backup copies: expire through backup rotation within a maximum target of 90 calendar days after active-copy deletion.
- Active-copy deletion statement: provide within five business days after deletion is completed.
- Legal/accounting, contract, security, and dispute records: retain only the minimum required, access-restricted, and not as a source-code archive.

**Current verification boundary:** No end-to-end automated deletion scheduler, storage inventory, backup-expiry attestation, or deletion-certificate workflow has been verified in this repository review. Until those controls are built and tested, Operations must maintain a per-project deletion register and execute the steps manually across every TECH360-controlled repository, workspace, object store, local device, and backup system. Do not state that all copies were permanently erased until the systems and backup rotation have been checked.

Required deletion register fields: project/client reference; system/location; data category; active-copy deletion timestamp; operator; evidence reference; backup expiry date; legal/security exception; exception owner; certificate issue date.

## 6. Ownership and client independence

- Identify project-specific custom deliverables in the SOW and handover manifest.
- Identify TECH360 pre-existing reusable components and the perpetual embedded-use licence granted to the client.
- Identify open-source and paid third-party dependencies and their licence obligations.
- Give the client the rights and documentation needed to engage another developer to maintain and modify the delivered system.
- Prefer client-owned domain, hosting, cloud, repository, database, email, and third-party accounts.
- Disclose any TECH360-operated dependency, recurring fee, migration limitation, or required subscription before SOW approval.
- Never retain a hidden kill switch, undisclosed account dependency, or control credential after handover.

## 7. No hidden charges

Every SOW must contain:
- Fixed project fee and currency.
- Included deliverables and exclusions.
- Third-party services and estimated/current costs.
- Which account owns each third-party service.
- Whether each cost is one-time, monthly, annual, or usage-based.
- Renewal and cancellation responsibility.
- Optional maintenance/support pricing or a statement that it is not included.
- A written change-control process.

No recurring TECH360 charge continues after handover unless the client separately opts in through a written agreement.

## 8. Warranty and support

- Standard defect-correction warranty: 30 calendar days after written delivery acceptance, unless the SOW provides longer.
- Covered: reproducible defects in TECH360 custom work that materially fail the approved SOW/acceptance criteria.
- Excluded: new features, changed requirements, client/third-party modifications, unsupported environments, and independent third-party outages or API changes, subject to mandatory law and TECH360 responsibility for its own non-conforming work.
- Acknowledge warranty reports within two business days; communicate severity and a realistic repair target.
- Paid support after warranty requires a separate quote with rate, coverage, hours, response targets, exclusions, renewal, and termination. No rate is implied until quoted.

## 9. Company and portfolio verification

- Link the official Missouri Secretary of State business entity search: https://bsd.sos.mo.gov/BusinessEntity/BESearch.aspx?SearchType=0
- The public site may display the company-provided Missouri filing number LC014737249, but a current registry record or certificate must be independently checked before making a current active/good-standing claim.
- An EIN is not verified by the public Missouri entity search. Provide confidential tax evidence only through a secure channel when appropriate.
- Do not claim a Bangladesh registered office, branch, or physical development centre without current documentary evidence.
- Label hypothetical/representative examples as illustrative. Publish completed client work or measured outcomes only where project evidence exists and publication permission has been recorded.
- Keep evidence of client consent, redactions, project scope, completion, and any published performance metric.

## 10. Release gates before production publication

Do not mark the client-protection programme production-complete until all of the following are evidenced:

- Legal counsel reviews the policy text for the applicable governing law, cross-border customers, consumer/business classification, taxes, chargebacks, IP assignment, and enforceability.
- The owner approves the standard 100% post-preview payment model and any permitted SOW exceptions.
- The public legal pages render all policies and the footer links to each page.
- The home page, FAQ, proposal, invoice, SOW, client portal, and automation messages use the same payment and refund wording.
- Refund workflow is tested end-to-end, including second approval, provider-side refund, reconciliation, and client notice.
- Payment sandbox/production status is proven per provider; unbuilt gateways remain unavailable.
- Handover tests prove unpaid/partially-paid refusal and fully-paid release.
- Deletion register, backup inventory, retention schedule, and deletion statement are operated and evidenced.
- Ownership/dependency inventory is present in the SOW and handover package.
- Warranty cases and paid support quotations are recorded and auditable.
- Missouri registry evidence, Bangladesh operational evidence (if claimed), and portfolio permissions are current.
- GitHub CI passes for the policy branch and a separate production deployment verification is completed.

## 11. Evidence and status language

Use only these statuses:
- **VERIFIED IN CODE:** repository implementation inspected or automated test passed.
- **MANUAL OPERATION REQUIRED:** code does not automate the activity; an operator checklist and evidence register are required.
- **BLOCKED ON PROVIDER/OWNER:** credentials, provider acceptance, owner decision, or legal review is outstanding.
- **NOT VERIFIED IN PRODUCTION:** no live deployment, real payment, real deletion, or external system evidence has been inspected.

A green GitHub CI run is not proof of live deployment, actual refund transfer, permanent deletion from backups, or current company registry status.
