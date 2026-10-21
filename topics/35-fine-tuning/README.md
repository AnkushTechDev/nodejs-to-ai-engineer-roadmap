# 35. Fine-tuning, LoRA, and preference optimization

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Advanced and specialization  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [03](../03-machine-learning/README.md), [26](../26-evaluation/README.md)

> Fine-tuning changes a model’s behavior through training. It is useful for some tasks, but it is not the first fix for every bad answer.

## Choose the intervention that matches the problem

Prompting changes instructions at request time. RAG supplies fresh external evidence. Fine-tuning updates model parameters using examples. If company policy changes weekly, retrieval is usually a better way to supply current facts. If you need consistent specialized behavior across many examples, tuning may help.

**Supervised fine-tuning (SFT)** trains on desired input-output pairs. **LoRA** trains small low-rank parameter additions rather than all original weights. **QLoRA** combines quantized base weights with adapter training. These are techniques, not guarantees of lower total project cost or better quality.

Preference optimization uses comparisons or rewards to shape behavior. Methods such as DPO and reinforcement-learning approaches have different objectives and operational requirements. Start with a clear supervised baseline before adding complexity.

## Data quality dominates

Collect representative examples, consistent labels, difficult edge cases, and appropriate permissions. Remove secrets and duplicates. Split by source, user, or time before generating paraphrases so near-duplicates do not contaminate evaluation. A large pile of weak examples can train the wrong behavior more efficiently.

Track dataset version, base model, hyperparameters, checkpoint, and held-out results. Compare against the untuned model with a strong prompt and against a retrieval baseline where appropriate. Watch for regressions in general capabilities and safety behavior.

## Keep deployment in the plan

Training needs compatible tooling and often Python/GPU infrastructure. Serving adapters, merging weights, rollback, and model licensing are separate concerns. This chapter prepares a tiny dataset row; it does not upload data or launch a paid training job.

## Read and run the example

[Full JavaScript example](../../examples/35-fine-tuning.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 35
```

```javascript
// Inspect a training row without uploading anything or starting a training job.
const row = { messages: [
  { role: 'system', content: 'Classify support tickets. Return one label: billing, technical, other.' },
  { role: 'user', content: 'I was charged twice.' },
  { role: 'assistant', content: 'billing' },
] };
const testRow = { messages: [{ role: 'user', content: 'My invoice has a duplicate payment.' }] };
console.log('Training JSONL row:', JSON.stringify(row));
console.log('Held-out example:', testRow);
console.log('Split by customer/time/source before generating paraphrases; avoid leakage.');
```

The script prints one training JSONL row and a held-out example. This makes the dataset contract visible without pretending that a single row is a useful training set.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Create twenty diverse classification examples and a labeling rubric. Reserve a source-separated test set before tuning anything.

## You are ready to move on when…

Explain when you would choose prompting, RAG, or tuning, and how you would prove tuning helped.

## Learn from the source

[Hugging Face PEFT LoRA guide](https://huggingface.co/docs/peft/main/en/conceptual_guides/lora). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← Local models and open-weight deployment](../34-local-open-models/README.md) · [Queues, incremental indexing, and data lifecycle →](../36-data-pipelines/README.md)
