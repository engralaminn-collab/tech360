# Candidate target architecture — not an implementation approval

```text
Approved visitor -> existing consented intake / chat -> TECH360 CRM
  -> requirements / scope draft -> human approval -> client approval
  -> invoice + trusted payment evidence -> project / preview / revisions
  -> authorized delivery -> acceptance / audit history

Staff -> existing admin RBAC -> bounded job queue -> isolated workers
  -> approved tools / optional model adapters -> evidence + audit
  -> reviewable outputs; no independent contractual or payment approval

Authorized repo registration -> immutable snapshot -> isolated static worker
  -> pinned REA (optional) + independent tests -> evidence/report store

ALO and MarketingOS remain separate systems of record
  -> authenticated, versioned connectors only after data ownership and
     consent review; no shared schema mutation or credential replication.
```

Per-object authorization, idempotency, tenant isolation, retention, secure uploads, audit and provider availability must be verified before integrations. Existing MySQL, SQLite, auth and deployment boundaries must not be replaced merely to conform to a diagram. Restrict agent and repository contents as untrusted data. Architecture and choices are provisional until owner review.
