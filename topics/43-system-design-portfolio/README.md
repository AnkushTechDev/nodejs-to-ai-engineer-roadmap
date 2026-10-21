# 43. AI system design, capstones, and interview preparation

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Career and deeper study  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [14](../14-rag/README.md), [19](../19-agents/README.md), [26](../26-evaluation/README.md), [28](../28-security/README.md), [31](../31-deployment-llmops/README.md)

> A good portfolio demonstrates reasoning, measured behavior, and operational judgment as well as a working demo.

## Explain the problem before the stack

For an internal policy assistant, state the users, data sources, permissions, update frequency, response-time goal, and expected answer behavior. Estimate corpus size and traffic. Decide whether lexical retrieval is enough before adding a vector database, reranker, or agent.

Draw the indexing and query paths. Describe model and storage choices, failure handling, observability, evaluation, deletion, and rollback. Identify where the system abstains and where a human reviews a consequential action. Explain tradeoffs rather than listing tools.

## Build three reviewable artifacts

1. A documentation assistant that retrieves evidence, answers with citations, and refuses unsupported questions.
2. A support workflow that prepares an action, binds approval to its exact payload, and prevents replay.
3. An HTTP retrieval service with request validation, bounded bodies, and permission isolation.

This repository includes learning implementations for all three. Extend them with your own data, evaluations, durable storage, and authentication. Do not describe local demos as production-ready services.

## Present evidence

A project README should include setup, architecture, example requests, limitations, evaluation dataset and results, cost assumptions, and a short demo. Report failures you found and how you fixed them. A candid error analysis is more useful than an unverified claim of perfect accuracy.

Practice interview explanations: RAG versus tuning, chunking tradeoffs, hybrid search, agent stopping conditions, injection defenses, checkpoint replay, and model rollout. Answer with concrete examples and measurements.

Your next step depends on the role. Application AI engineering emphasizes reliable integrations; training-heavy roles need deeper statistics, Python, data, and GPU systems.

## Read and run the example

[Full JavaScript example](../../examples/43-system-design-portfolio.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 43
```

```javascript
const design = {
  useCase: 'Internal policy assistant',
  sourceOfTruth: 'Versioned handbook with tenant permissions',
  retrieval: 'BM25 baseline; compare dense/hybrid using held-out questions',
  generation: 'Evidence-only responses with source IDs and abstention',
  failurePolicy: 'No retrieval evidence -> no generated policy answer',
  releaseGate: 'No cross-tenant leaks; quality and latency meet measured targets',
};
for (const [decision, reason] of Object.entries(design)) console.log(`${decision}: ${reason}`);
```

The script prints a compact system-design decision record. Use it as a starting checklist for the included capstones, then replace each line with your measured choices.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Write a two-page architecture and evaluation report for one capstone, including two failures and one rejected design alternative.

## You are ready to move on when…

Give a five-minute explanation of your system without relying on framework names.

## Learn from the source

[Portfolio capstones](../../projects/README.md). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← Quantization, distillation, batching, and serving](../42-model-optimization/README.md) · [The Python bridge and reading AI research →](../44-python-and-research/README.md)
