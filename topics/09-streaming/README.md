# 09. Streaming and a responsive user experience

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** LLM applications  
**Run mode:** API: credentials and a compatible model are required; calls may cost money.  
**Before this chapter:** [06](../06-model-apis/README.md)

> Streaming can show useful progress early, but it adds lifecycle and cancellation responsibilities.

## A response arrives in events

A normal HTTP call waits for the complete result. A streaming call yields small events while the provider is working. In Node.js, an async iterator lets you process these events with `for await`. Text deltas are fragments of an answer; a fragment is not necessarily a word, sentence, or complete JSON object.

Distinguish **time to first token** from total completion time. Streaming may improve perceived responsiveness without reducing the total work. Some models spend time before producing text. Display a clear loading state instead of inventing progress percentages.

## Own the lifecycle

Your application should handle normal completion, provider errors, refusals, incomplete responses, client disconnects, and cancellation. If the user closes the browser, abort upstream work where supported. If playback or rendering is slower than generation, use backpressure rather than unbounded buffers.

SSE works well for one-way server-to-browser updates; WebSockets are useful when both sides send ongoing events. Keep secret keys on the backend. Authenticate the stream and avoid placing credentials in query strings that proxies may log.

## Partial output is untrusted

Do not execute a tool because its name appeared in a text fragment. Wait for a complete structured tool request, validate it, and authorize it. A partially streamed JSON object cannot be used as the final application record. Label partial results in the UI and handle a failed stream without presenting them as completed work.

## Read and run the example

[Full JavaScript example](../../examples/09-streaming.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 09
```

```javascript
import { getClient, getModel } from './lib/provider.mjs';
const stream = await getClient().responses.create({
  model: getModel(), input: 'Explain RAG in three short sentences.', stream: true,
  store: false, max_output_tokens: 512,
});
let completed = false;
for await (const event of stream) {
  if (event.type === 'response.output_text.delta') process.stdout.write(event.delta);
  if (event.type === 'response.refusal.delta') process.stderr.write(event.delta);
  if (event.type === 'response.completed') completed = true;
  if (['response.failed', 'response.incomplete', 'error'].includes(event.type)) throw Error(`Stream failed: ${event.type}`);
}
if (!completed) throw Error('Stream ended without completion');
process.stdout.write('\n');
```

The script prints only text delta events, handles refusal text, and checks for a completed terminal event. It is a CLI stream; browser SSE transport is a separate concern.

**Expected behavior:** Text arriving incrementally, followed by a normal completion or an explicit stream error.

## Try it yourself

Add elapsed-time measurement for the first text delta and final completion. Compare the two timings.

## You are ready to move on when…

Explain how cancellation and terminal-event checks prevent wasted work and misleading output.

## Learn from the source

[Official OpenAI streaming guide](https://developers.openai.com/api/docs/guides/streaming-responses). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← Structured outputs and schema validation](../08-structured-outputs/README.md) · [Embeddings and semantic similarity →](../10-embeddings/README.md)
