# REA capability report — source/documentation review, no execution

Repository `morluto/rea`, main HEAD `356cc50475cee0dfeb8114de5069ba4ed87a4568` (snapshot); `LICENSE` is MIT. Selected README, `package.json`, `SECURITY.md`, `server.json`, `src/main.ts`, source/test directory inventory, `docs/mcp-contracts.md`, and `docs/android-analysis.md` examined. No installation, MCP invocation, provider or tests executed. Submodule and third-party notices require further licence review.

| Capability | Status | Basis / condition |
|---|---|---|
| Repository/source analysis | NOT VERIFIED | JavaScript analyzer documented; whole-repository accuracy and privacy untested. |
| Structure/execution flow | NOT VERIFIED | Static relationships are not runtime evidence. |
| API, modules, dependency mapping | NOT VERIFIED | Documentation covers imports/routes; TECH360 API and database coverage requires fixture tests. |
| Web analysis | ADDITIONAL DEPENDENCIES REQUIRED | Browser observation requires compatible browser; no trial. |
| Native binary analysis | ADDITIONAL DEPENDENCIES REQUIRED | Provider such as Ghidra/Hopper/IDA, and only authorized samples. |
| Android | ADDITIONAL DEPENDENCIES REQUIRED | Documented JADX + JDK; engine and results untested. |
| Agent/MCP | NOT VERIFIED | `server.json` describes stdio; `src/main.ts` serves MCP. No handshake or tools/list tested. |
| Evidence/report generation | NOT VERIFIED | MCP contract describes evidence IDs and bundles, not verified integration or persistence. |
| Regression and tests | DEVELOPMENT REQUIRED | REA comparisons are not a compiler, debugger, test runner or security scanner; integrate independent CI and baseline comparison. |

`package.json` requires `^22.23.4 || ^24.22.1 || >=26.12.1`; current sandbox Node 22.22.3 does not satisfy it. TECH360's runtime is constrained to Node 22.x; use a separately pinned compatible worker rather than silently changing app runtime. `SECURITY.md` expressly states REA is not a sandbox: its analysis providers run as the caller and some tools execute or interact with targets.

Proposed post-approval experiment: isolated disposable worker with least-privilege identity, pinned REA/provider versions, authorized read-only fixture snapshot, no credentials, no outbound network by default, resource/time/output limits and an allowlisted static MCP tool set. Record source hash, commit, tool version, evidence, coverage, and uncertainty; block prompts in analyzed files from granting permissions. Review licences and model-data policy first. Test escape attempts and failed jobs; do not connect production or accept arbitrary local paths. No integration or production modification is authorized by this report.
