# 34. Local models and open-weight deployment

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Advanced and specialization  
**Run mode:** Local model: requires Ollama and separately downloaded weights.  
**Before this chapter:** [06](../06-model-apis/README.md), [28](../28-security/README.md)

> Running a model locally can give you deployment control, but it moves hardware, capacity, and maintenance responsibility to your system.

## Open weights are not the same as every other kind of open

A model may publish its weights while having specific license and usage conditions. Check the license, redistribution terms, model card, intended use, and limitations. “Available to download” does not automatically mean unrestricted commercial use or that the entire training process is reproducible.

Ollama is one way to run supported models behind a local API. Other serving systems focus on high-throughput GPU inference, distributed deployment, or browser execution. Pick based on hardware, model format, concurrency, and required features.

## Capacity is practical math

Weights consume memory. Runtime buffers and the key-value cache consume additional memory, especially with long context and concurrent requests. Quantization can reduce weight size but may affect quality and require compatible kernels. CPU-only inference can be useful for experiments but may not meet production latency goals.

Measure warm and cold latency, tokens per second, memory use, and quality on your tasks. A local model with a familiar API may not support the same tool calling or schema guarantees as a hosted model. Do not assume it is a drop-in replacement.

## Local is a deployment choice

Keep the model endpoint protected. A service bound to every interface without authentication can expose private prompts or consume your hardware. Review download provenance and updates. Data can still leak through logs, plugins, remote tools, or backups even when inference is local.

For this chapter, install Ollama separately, download a text model you are licensed to use, and set `OLLAMA_MODEL` to its exact installed name. The repository does not download large weights automatically.

## Read and run the example

[Full JavaScript example](../../examples/34-local-open-models.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 34
```

```javascript
const model = process.env.OLLAMA_MODEL;
if (!model) throw Error('Set OLLAMA_MODEL to a downloaded text model. See chapter 34.');
const response = await fetch('http://127.0.0.1:11434/api/chat', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(60000),
  body: JSON.stringify({ model, messages: [{ role: 'user', content: 'Explain vector search in two sentences.' }], stream: false }),
});
if (!response.ok) throw Error(`Local model HTTP ${response.status}`);
const result = await response.json();
if (!result.message?.content) throw Error('No text returned');
console.log(result.message.content);
```

The script calls the local `/api/chat` endpoint with a deadline and prints the returned text. It requires an already running Ollama service and an installed model.

**Expected behavior:** A response from your installed local model, or a clear connection/model error.

## Try it yourself

Run the same five questions on a local and a hosted model. Compare quality, latency, memory requirements, and supported features.

## You are ready to move on when…

Explain why local inference is not automatically faster, cheaper, or private in every deployment.

## Learn from the source

[Ollama chat API](https://docs.ollama.com/api/chat). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← Speech, audio, and realtime assistants](../33-voice-and-realtime/README.md) · [Fine-tuning, LoRA, and preference optimization →](../35-fine-tuning/README.md)
