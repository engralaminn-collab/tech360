# Industry solution catalogue — initial scope inventory

The existing Software Factory now exposes a read-only catalogue to Super Admin through `/api/admin/factory/solution-catalog`. Its 12 entries cover hospital, clinic, dental, pharmacy, education consultancy, school, college, madrasa, coaching, English assessment preparation, university admissions preparation and job exam preparation.

Each entry is a **DESIGN_ONLY** scope concept with proposed roles and modules, not evidence of a completed application, clinical compliance, deployable template, tested integration or active client instance. The version on each entry is a source catalogue revision, not a stored template-version history. No customer data, business model, credentials, migrations or generated files are copied or deployed by this catalogue.

The catalogue reuses the existing admin session guard and returns `private, no-store`; it cannot create or activate projects. Source-level tests check its guard declaration and entry inventory, but authenticated API, browser and database tests have not been run. Static catalogue content is tracked in the repository; it is not a secret vault and does not establish that the repository itself is private.

Before real activation, audit actual existing solution assets and licences, map evidence to each module, implement version-pinned manifests and ownership controls, isolate client data/configuration, add human approval and auditable instantiation, test dependencies/migrations/rollback, and verify each deployment. The existing generator produces source scaffolds only; agents have not been verified to build, test or deploy complete products autonomously. Production use needs separate explicit release approval.
