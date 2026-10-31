# Proposed telephony architecture — not implemented

```text
Approved carrier / SIP trunk -> SBC or restricted SIP edge -> PBX/media gateway
                                             | -> human WebRTC client (auth)
                                             | -> isolated AI media worker
                                             |    VAD -> streaming ASR -> policy/orchestrator
                                             |    -> permitted tools -> TTS -> audio
                                             | -> explicit human transfer / fallback
Gateway events -> authenticated adapter -> idempotent event inbox -> call state
  -> tenant-scoped CRM timeline, usage ledger, audit, recording metadata
Supervisor/admin -> existing control plane, explicit capability + tenant ownership
```

Separate control plane from SIP/RTP and inference workers; do not run media services inside Next.js. Establish tenant ownership from trusted ingress/provider mapping, never caller-supplied IDs. Require verified events, idempotency, state versioning, reconciliation, per-tenant quotas, outbox and compensating actions. Log only minimal metadata. Raw audio and transcripts need encrypted private object storage, retention enforcement and authorized access. Distinguish provider accepted, connected, completed, failed and unknown; never infer connected or queued from configuration.

## Candidate selection

- **Asterisk**: candidate for an isolated first PBX lab; official documentation describes ARI External Media and WebSocket channel options, dependent on version. Separate application and media connections, evaluate codecs, version and licensing. [Asterisk WebSocket](https://docs.asterisk.org/Configuration/Channel-Drivers/WebSocket/) / [External Media](https://docs.asterisk.org/Development/Reference-Information/Asterisk-Framework-and-API-Examples/External-Media-and-ARI/).
- **FreeSWITCH**: candidate media server with its own operational and licensing needs; compare via same fixture and stress tests. No capacity claims or choice approved.
- **Kamailio**: SIP signalling/proxy candidate, not a drop-in media engine. Add only if isolation, routing or scale tests justify operations burden. Its repository states a GPLv2 main licence with per-file variations: https://github.com/kamailio/kamailio.
- **WebRTC / SIP.js**: browser signalling is only one layer; assess TLS/WSS, DTLS-SRTP, ICE, STUN/TURN, auth, carrier compatibility and emergency-service limitations. Test in a disposable network before use.

No PSTN provider, architecture purchase, deployment or engine has been selected. Evaluate licensing for each component and codec separately. Require health checks, time synchronization, queue recovery, session reconnection, backpressure, retries with idempotency and an actual transfer confirmation. Avoid logging speech, tokens or raw caller IDs in unrestricted logs.

## Latency methodology

Instrument caller speech-end, ASR partial/final, policy/model, first TTS frame, gateway and first audible frame, with correlated clock synchronization. Report p50/p95, hardware, concurrency, network and language split. Explicitly handle barge-in/cancellation and packet loss. No capacity or latency numbers exist yet.
