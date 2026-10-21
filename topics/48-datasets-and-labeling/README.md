# 48. Datasets, labeling, and reproducible experiments

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Advanced and specialization  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [03](../03-machine-learning/README.md), [26](../26-evaluation/README.md), [35](../35-fine-tuning/README.md), [39](../39-responsible-ai/README.md)

> The quality of your evaluation and training data limits what you can confidently claim about the system.

## A dataset is a versioned product

Each record needs a stable ID, source, permitted use, relevant metadata, and a clear target or rubric. For RAG, labels may identify relevant passages and acceptable abstention. For classification, they specify categories and edge-case rules. For preference data, they describe which output is better and why.

Create labeling instructions before assigning hundreds of examples. Have multiple reviewers label a shared sample, inspect disagreement, and refine the rubric. Disagreement can reveal an ambiguous task rather than an incompetent reviewer. Track uncertain or adjudicated examples explicitly.

## Prevent contamination

Deduplicate exact and near-duplicate content. Split by source, customer, document family, or time as appropriate. Do this before augmenting with paraphrases. Keep evaluation examples out of prompt demonstrations and training data. Synthetic data can expand coverage, but it can also copy a generator’s mistakes and blind spots.

Measure coverage of languages, classes, document types, and realistic failure cases. A balanced teaching set and a production traffic distribution serve different purposes; report how the evaluation set was sampled. Do not silently remove hard cases to improve a score.

## Make a result reproducible

Record dataset hash/version, labeling rubric, code revision, model identity, prompt version, retrieval settings, and run configuration. Save outputs and errors under an appropriate data policy. Re-run a stable baseline before interpreting an experimental improvement.

Respect consent, licenses, and deletion requirements. Public availability is not blanket permission for every reuse. A dataset card should explain origin, intended use, limitations, sensitive content, and ownership. Use fictional fixtures while learning.

## Read and run the example

[Full JavaScript example](../../examples/48-datasets-and-labeling.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 48
```

```javascript
import assert from 'node:assert/strict';
const rows = [
  { id: 'a1', sourceGroup: 'policy-a', text: 'Leave allowance?' },
  { id: 'a2', sourceGroup: 'policy-a', text: 'How much leave?' },
  { id: 'b1', sourceGroup: 'policy-b', text: 'Expense deadline?' },
];
const testGroups = new Set(['policy-b']);
const train = rows.filter(row => !testGroups.has(row.sourceGroup));
const test = rows.filter(row => testGroups.has(row.sourceGroup));
assert.ok(train.every(row => !test.some(other => other.sourceGroup === row.sourceGroup)));
console.log({ train, test });
```

The example splits records by source group and verifies that the same group never enters both training and evaluation. It avoids the common mistake of randomly splitting individual paraphrases.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Create a small evaluation dataset card and label five ambiguous handbook questions with a second reviewer.

## You are ready to move on when…

Explain how source-group splitting prevents leakage and why a dataset needs its own version.

## Learn from the source

[Hugging Face dataset cards](https://huggingface.co/docs/hub/datasets-cards). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← TypeScript contracts and the JavaScript AI ecosystem](../47-typescript-and-js-ecosystem/README.md) · [Build a capstone →](../../projects/README.md)
