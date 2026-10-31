# Provider compatibility — candidates, not enabled

| Component | Candidate | What can be evaluated locally | External dependency / status |
|---|---|---|---|
| PBX/media | Asterisk, FreeSWITCH | isolated SIP endpoints, IVR, queues, failure and media adapter tests | PSTN requires an approved trunk/provider; not tested. |
| SIP edge | Kamailio | signalling lab, registration and routing | Operational complexity, version and legal/licence review; no production instance verified. |
| Browser calling | SIP.js / WebRTC | isolated browser-to-lab endpoints with proper TLS/ICE | network configuration, TURN when required and browser media permissions; untested. |
| Bangladesh PSTN | licensed carrier / IPTSP | adapter contract tests without calls | provider licence, available numbers, approved routing, terms, pricing and connectivity unverified. |
| Twilio | existing config names in `src/lib/telephony.ts` | adapter tests with synthetic fixtures | credentials alone prove neither a call implementation nor Bangladesh regulatory permission; no provider acceptance test. |
| SMS | `sendDeviceSms` adapter | unconfigured/error unit tests | physical gateway/provider, consent and service configuration required. |
| WhatsApp / email | existing TECH360 integrations | contract and signature tests with fixtures | Meta/provider permission, credentials and consent required; no external message sent. |
| ASR/TTS/LLM | local adapters to be evaluated | licensed models, appropriate local compute and consented samples | exact model quality/licence/hardware not established. |

Every provider interface should return explicit NOT_CONFIGURED, CONFIGURED_UNVERIFIED, HEALTHY, DEGRADED and FAILED states, with authenticated event IDs, retries, idempotency and audited configuration. No prices, inventory, provider availability, credits or call outcomes are invented. Actual providers must be reviewed for Bangladesh service eligibility, number ownership, portability, recording policy, data residency and emergency calling limitations.
