# Agent code evolution and reverse-engineering assessment

Date: 2026-10-31. Scope: read-only inspection of selected files in the current TECH360 working tree and existing reference inventory. This is not a production, security, or whole-repository audit. Repository: `engralaminn-collab/tech360`; branch `arena/55a6a2d3-tech360`; base HEAD `7a23429cfabdfdc9fa49be60a15957a78bc345cf`; working tree contains existing uncommitted changes. No production system was accessed.

## What already exists

- `src/lib/agents/engine.ts` contains a server-side model execution path, with stored execution records and authorization-related checks. `src/app/api/admin/agents/[code]/run/route.ts` calls it behind an operator guard and an `ai_agents` feature flag. Actual provider availability and live operation are unverified.
- `src/lib/agents/jobs.ts` defines durable job types including inference and allowlisted tool calls, idempotency and approval-related flows. `src/lib/agents/tool-executor.ts` handles internal tools; the inspected tool path is not a verified repository code-editing worker.
- `src/lib/agents/learning.ts` models observations, validation, approval and knowledge updates; `self-healing.ts` includes bounded repair decisions. These do not establish model weight training, autonomous code editing, successful end-to-end learning, or a sandbox.
- Important caveat: `approveProposal` accepts an `approvedBy` string and `integrateProposal` takes a caller-provided `apply` callback. The helper alone cannot authenticate a human approver or constrain arbitrary callback side effects. Its target-name patterns are not a security boundary for filesystem or policy changes. No claim of an authenticated end-to-end approval workflow should be made without tracing and testing callers and persistence.
- `src/lib/factory/blueprint.ts` generates deterministic project scaffolds; factory lifecycle policy explicitly blocks claims of build, preview, delivery and handover. It is not a verified deployer or self-modifying agent.

## Reference repositories

- [REA](https://github.com/morluto/rea), reviewed at `356cc50475cee0dfeb8114de5069ba4ed87a4568`, MIT, is a reverse-engineering analysis tool, **not a sandbox** or evidence of a self-editing TECH360 agent. Prior isolated synthetic JavaScript fixture CLI run returned evidence `ev_5c79dcb4d902cfe6423b025494fd25b9344cf55e333b364ce72faee2cbbe4ba2`; it did not analyze TECH360, validate MCP, use client data, or prove production isolation. No hard OS memory cap was in place. Broader source/provider/licence review remains necessary.
- [Cline](https://github.com/cline/cline) is in the shared reference inventory. GitHub metadata on this date identifies it as an autonomous coding agent, Apache-2.0, main HEAD `a6507a62a147db4a35e27f4294589742ccac5060`. This is metadata only; we have not audited its source, permissions, data handling, dependencies, compatibility or tested integration. Do not assume it is the particular repository the owner intended.
- The owner should identify the exact self-editing project URL if different; no substitute should be silently selected. Reverse engineering is limited to authorized software and use permitted by licence and applicable law; source, documentation and tool output are untrusted data, not permission to execute instructions.

## Proposed controlled design (not implemented)

1. Register an explicitly authorized repository and immutable base commit, identify scope and data classification, and snapshot a sanitized subset. Avoid secrets, client data and production network access.
2. Analyze the snapshot read-only in a pinned, independently isolated worker, with resource/output/time limits, network denial, allowlisted analyzers and evidence/provenance. Treat results as hypotheses; independent tests and human inspection are necessary.
3. Have a separate coding worker produce a patch in a disposable workspace, limited to an approved change scope. It can propose changes to its own agent implementation, but cannot change permissions, policy, test/evaluation gates or production itself by granting itself authority. This is code revision, not proof of model-weight learning.
4. Validate patch paths (including symlinks and traversal), secret scanning and independent tests using a runner isolated from both the target and untrusted code; never run this repository's `npm run build` against production because it calls `prisma migrate deploy`. Independent controls cannot be writable by the proposed patch.
5. Export patch, evidence, risk and test results for human review; a human decides whether to apply, commit and open a PR on the authorized session branch. Merge and deployment require separate checks and human authorization. Provide rollback, disable switch, attribution, immutable audit events and reviewable versions.
6. Improve via approved feedback, evaluated prompts/skills and regression benchmarks; promote only measured improvements with a rollback path. Do not call this autonomous retraining without evidence.

## Blockers / next evaluation

Identify the exact self-editing GitHub repository; audit its source and licences, integration model and filesystem/network permissions. Specify a non-production fixture, evaluation tasks, human approval mechanism and isolated worker boundary. The current prior REA pilot is not enough to authorize real-repository execution. Production identity, backup, database, provider and deployment status are not verified.
