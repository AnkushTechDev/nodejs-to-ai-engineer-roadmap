# 33. Speech, audio, and realtime assistants

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Advanced and specialization  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [09](../09-streaming/README.md), [20](../20-langgraph/README.md), [30](../30-nodejs-backends/README.md)

> Voice experiences add timing, interruption, and media handling to the same model and tool boundaries you already learned.

## Two common architectures

A chained voice assistant captures audio, transcribes speech to text, sends text to a model, and converts the answer back to speech. This is easy to inspect component by component. A speech-to-speech or realtime model can handle audio interaction more directly, with different latency and control tradeoffs.

Learn sample rate, channels, encoding, audio frames, voice activity detection, endpointing, transcription, and text-to-speech. A transcription error can change a tool argument, so confirm important names, amounts, or dates before consequential actions.

## A conversation is not one HTTP call

Users pause, interrupt, change their minds, and speak over playback. **Barge-in** means the user starts talking while the assistant is speaking. Stop queued audio and cancel or discard stale generation. Use turn IDs so a late response from an earlier turn does not play over a newer one.

Measure capture-to-first-audio latency, not just model latency. Buffering, network jitter, transcription, synthesis, and playback all contribute. Handle disconnects and clean up sessions so the system does not keep recording or generating after the interaction ends.

## Protect the media boundary

Request appropriate microphone permissions and make recording state visible. Keep long-lived secrets off browser clients; use the provider’s supported short-lived session mechanism when direct client connections are needed. Define consent, retention, and deletion policies for recordings and transcripts.

The example covers control flow only. A production voice app also needs a media transport such as WebRTC or WebSocket integration, codec handling, and actual speech services.

## Read and run the example

[Full JavaScript example](../../examples/33-voice-and-realtime.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 33
```

```javascript
// A state machine for barge-in: the user starts talking while audio is playing.
let state = 'idle';
const transition = {
  idle: { speech_start: 'listening' },
  listening: { speech_end: 'transcribing' },
  transcribing: { transcript_ready: 'thinking' },
  thinking: { audio_ready: 'speaking' },
  speaking: { speech_start: 'listening', playback_end: 'idle' },
};
for (const event of ['speech_start', 'speech_end', 'transcript_ready', 'audio_ready', 'speech_start']) {
  const next = transition[state]?.[event];
  if (!next) throw Error(`Invalid transition ${state}/${event}`);
  if (state === 'speaking' && event === 'speech_start') console.log('Cancel model output and clear queued playback.');
  state = next; console.log({ event, state });
}
// No audio capture/transcription is performed; this isolates realtime control logic.
```

The script models listening, transcription, thinking, and speaking states. The final event simulates a user interruption and triggers playback cancellation logic.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Add an event for network disconnect from each active state. Ensure every path reaches a clean terminal or idle state.

## You are ready to move on when…

Explain barge-in and why a voice assistant needs turn identities and cancellation.

## Learn from the source

[Official OpenAI audio guide](https://developers.openai.com/api/docs/guides/audio). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← Images, OCR, document understanding, and multimodal models](../32-multimodal-ai/README.md) · [Local models and open-weight deployment →](../34-local-open-models/README.md)
