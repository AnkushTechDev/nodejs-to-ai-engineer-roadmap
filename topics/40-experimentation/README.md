# 40. A/B tests, feedback, and continuous improvement

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Advanced and specialization  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [26](../26-evaluation/README.md), [29](../29-cost-latency-caching/README.md), [31](../31-deployment-llmops/README.md)

> An offline improvement must still help real users without creating unacceptable latency, cost, or harm.

## Separate a hypothesis from a release

A useful experiment asks a specific question: “Does a reranker improve task completion enough to justify its latency?” Choose a primary metric, guardrails, population, allocation method, and stopping plan before looking at results.

Assign users or another appropriate unit consistently so a person does not alternate unpredictably between variants. Keep assignment independent of outcomes. Record exposure, not just the configured variant: an error before a user sees the feature should be distinguishable from a completed interaction.

## Understand uncertainty

Tiny differences can be noise. Sample size, variance, repeated peeking, and multiple comparisons affect conclusions. Do not stop the moment a favorable number appears. Time-of-day effects, novelty, and unequal traffic sources can distort a naive comparison.

Offline evaluations remain a gate before experiments. Do not use live users to discover obvious permission leaks or dangerous tool behavior. Canary releases monitor reliability; randomized experiments estimate product effects. They can overlap, but have different goals.

## Feedback is useful and biased

Thumbs-up/down signals are incomplete: many users never rate an answer, and a pleasant wrong answer can receive positive feedback. Combine feedback with task outcomes and reviewed samples. Never automatically promote raw feedback into training data without quality and permission checks.

Store experiment and prompt versions with results. Decide in advance how you will roll back if quality, security, or cost guardrails fail. A successful experiment should produce a documented decision, including its limitations.

## Read and run the example

[Full JavaScript example](../../examples/40-experimentation.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 40
```

```javascript
// A/B allocation is stable across requests. IDs should be pseudonymous.
import { createHash } from 'node:crypto';
function variant(userId, experiment) {
  const bucket = createHash('sha256').update(`${experiment}:${userId}`).digest().readUInt32BE(0) % 100;
  return bucket < 50 ? 'control' : 'candidate';
}
for (const id of ['u1', 'u2', 'u3']) console.log(id, variant(id, 'prompt-v2'));
console.log('Record assignment before outcomes; monitor quality, latency, cost, and harm guardrails.');
```

The example uses a stable hash to assign pseudonymous users to two variants. It does not compute statistical significance or collect real traffic.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Design an experiment comparing BM25 against hybrid retrieval. Define a primary outcome, two guardrails, and an allocation unit.

## You are ready to move on when…

Explain the difference between a release canary and a randomized product experiment.

## Learn from the source

[Google ML production guidance](https://developers.google.com/machine-learning/guides/rules-of-ml). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← Responsible AI, privacy, and accessible products](../39-responsible-ai/README.md) · [GraphRAG, knowledge graphs, and text-to-SQL →](../41-graph-rag-and-text-to-sql/README.md)
