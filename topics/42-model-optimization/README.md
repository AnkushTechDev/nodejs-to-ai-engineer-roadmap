# 42. Quantization, distillation, batching, and serving

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Advanced and specialization  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [04](../04-neural-networks-transformers/README.md), [34](../34-local-open-models/README.md), [35](../35-fine-tuning/README.md)

> When you operate model inference, memory layout and scheduling can matter as much as application code.

## Smaller representations change the tradeoff

**Quantization** represents weights or activations with fewer bits. It can reduce memory and sometimes improve throughput, but quality and speed depend on the method, model, hardware, and kernels. INT8, INT4, and mixed-precision formats are not interchangeable.

**Distillation** trains a smaller student to imitate useful behavior from a teacher. It needs data, training, and evaluation; it is not just saving a compressed file. **Pruning** removes parts of a model, but practical acceleration requires a serving stack that benefits from the resulting structure.

## Serve multiple requests efficiently

Batching combines requests to use hardware more effectively. Continuous batching lets a server admit and finish sequences dynamically. It can improve throughput while changing per-request latency. Measure the workload you actually expect, including concurrency and output length.

The **KV cache** stores attention information for tokens already processed during generation. It speeds incremental decoding but consumes memory that grows with context and active requests. Prefix caching reuses compatible shared prefixes under specific serving rules. Speculative decoding uses candidate tokens and verification to accelerate generation in suitable setups.

## Benchmark the right result

Report hardware, model, precision, context length, output length, concurrency, warmup, latency percentiles, and throughput. Compare output quality before declaring an optimization successful. A lower memory footprint does not automatically mean lower cost if throughput or quality worsens.

For many application engineers, a hosted model is the right starting point. Learn these topics when local deployment, privacy requirements, predictable scale, or specialized latency makes serving your own model worthwhile.

## Read and run the example

[Full JavaScript example](../../examples/42-model-optimization.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 42
```

```javascript
// Toy symmetric quantization: map floats into signed 8-bit integers plus a scale.
const weights = [0.12, -0.7, 1.4, -0.08];
const scale = Math.max(...weights.map(Math.abs)) / 127;
const quantized = Int8Array.from(weights.map(value => Math.round(value / scale)));
const restored = [...quantized].map(value => value * scale);
const meanSquaredError = weights.reduce((sum, value, i) => sum + (value - restored[i]) ** 2, 0) / weights.length;
console.log({ weights, quantized: [...quantized], scale, restored, meanSquaredError });
// This illustrates rounding error, not a model quantizer or a speed benchmark.
```

The script maps four floats into signed 8-bit integers, reconstructs them, and reports rounding error. It demonstrates numerical loss only, not a real model quantizer or inference speedup.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Compare reconstruction error with a toy 4-bit range. Explain why this small experiment cannot predict a language model’s task quality.

## You are ready to move on when…

Explain the difference between memory savings, throughput improvements, and latency improvements.

## Learn from the source

[Hugging Face quantization documentation](https://huggingface.co/docs/transformers/quantization/overview). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← GraphRAG, knowledge graphs, and text-to-SQL](../41-graph-rag-and-text-to-sql/README.md) · [AI system design, capstones, and interview preparation →](../43-system-design-portfolio/README.md)
