# Bangla voice model evaluation plan — no models executed

Goal: commercially permissible, natural and intelligible Bangladeshi Bangla (bn-BD) with English code-switching; candidate support is not an acceptance result.

| Candidate | Research status / licence gate | Unknowns |
|---|---|---|
| faster-whisper | Repository identifies MIT code and CTranslate2; https://github.com/SYSTRAN/faster-whisper. Check each weight, dependency and runtime licence separately. | bn-BD WER/CER, streaming wrapper, code-switching, latency and resources not measured. |
| Whisper family | Evaluate exact checkpoint, provenance, fine-tunes and model licence separately. | Bangla accuracy, phone noise and deployment cost unknown. |
| Piper | Current `OHF-Voice/piper1-gpl` repo is GPL-3.0; each voice/model card has separate terms: https://github.com/OHF-Voice/piper1-gpl/blob/main/docs/VOICES.md. | Suitable licensed bn-BD voice, accent and quality not established. |
| Coqui / XTTS | Toolkit code and weights are different licence subjects. An upstream discussion identifies CPML commercial restrictions: https://github.com/coqui-ai/TTS/discussions/4304. | Do not use commercially without verified rights; Bangla support and quality unverified. |
| Kokoro / other Bangla-specific research candidates | Check model card, weights, training data and legal use for each actual revision. | No bn-BD support, style controls or rights assumed. |

## Evaluation protocol

1. Obtain written informed consent and recording/processing/revocation permissions from diverse adult Bangladeshi speakers; create a rights and consent ledger. Avoid sensitive personal data, exclude copyrighted text without rights, encrypt raw audio and restrict reviewers. Separate training, tuning and held-out test speakers and transcripts; prevent overlap and contamination.
2. Stratify by regional pronunciation, gender presentation volunteered by participants, age bands where appropriate, clean/noisy phone audio, microphone/channel, short/long text, questions, dates, currency, addresses, domain terms and Bengali-English mixing. Agree sample sizes and acceptance thresholds before collecting; report coverage and confidence intervals.
3. ASR: documented Bangla normalization/tokenization, WER and character error rate, mixed-language error rate, hallucination/omission rates, VAD and punctuation, p50/p95 partial/final latency per hardware/codec/concurrency. Have native reviewers independently verify references; note uncertainty.
4. TTS: blind randomized naturalness/intelligibility/pronunciation ratings, paired baseline comparisons, number and code-switch reading, artifacts, first-frame and real-time factor, language and speaker consistency. Include disaggregated results and inter-rater agreement; don't call a voice human-like by marketing claim.
5. Test consent-backed cloning only after identity, permissions, revocation, access controls, abuse policy and model/dataset rights are reviewed. Separate that feature from generic synthesis.

No audio, model weights or paid services were downloaded or tested during Phase 0. Hardware, model support and costs remain unknown.
