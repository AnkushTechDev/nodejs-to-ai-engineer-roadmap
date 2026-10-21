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
