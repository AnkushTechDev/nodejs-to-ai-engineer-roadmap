# 29. Cost, latency, caching, and reliability budgets

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Production engineering  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [05](../05-tokens-and-context/README.md), [26](../26-evaluation/README.md), [28](../28-security/README.md)

> A useful AI feature must work within response-time and spending limits, including during failures.

## Count the entire request

Model generation is only one cost. Include embedding queries, document ingestion, retrieval infrastructure, reranking, repeated agent steps, storage, and human review. Estimate a normal request and a worst-case request. Use current provider rates rather than copying old prices from a tutorial.

Measure before optimizing. A slow parser needs a different fix from a large prompt or an overloaded model service. Parallelize only independent steps, bound concurrency, and use queues for background ingestion. Streaming improves perceived latency, while fewer model calls may reduce total latency.

## Cache with the right identity

A response cache key should account for the question, tenant, permission version, prompt version, model configuration, and corpus version. A key based only on question text can leak another user’s answer or return stale policy. Apply TTLs and explicit invalidation for document deletion or access changes.

An **exact cache** matches the same request identity. A **semantic cache** reuses results for similar questions, which risks returning an answer for a subtly different condition. Evaluate semantic reuse carefully, especially for dates, quantities, permissions, and negation. Provider prompt caching is a separate mechanism with provider-specific behavior.

## Bound retries and fallbacks

Use exponential backoff with jitter for appropriate transient failures and honor retry guidance. Avoid multiplying SDK retries by application retries by queue retries. Circuit breakers can stop repeated calls to an unhealthy dependency. Fallback models need their own evaluation; a cheaper model may not support the same schema or tools.

## Read and run the example

[Full JavaScript example](../../examples/29-cost-latency-caching.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 29
```

```javascript
import { createHash } from 'node:crypto';
const keyFor = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const request = { tenantId: 'demo', permissionVersion: 2, model: 'chosen-model', promptVersion: 3, corpusVersion: 'v1', question: 'Leave policy?' };
console.log('Cache key:', keyFor(request));
console.log('Different tenant:', keyFor({ ...request, tenantId: 'other' }));
// Hypothetical rates, NOT a vendor price quote. Replace with your contracted rates.
const hypotheticalCost = ({ input, output, inputPerMillion, outputPerMillion }) =>
  (input * inputPerMillion + output * outputPerMillion) / 1_000_000;
console.log('Hypothetical dollars:', hypotheticalCost({ input: 2000, output: 300, inputPerMillion: 1, outputPerMillion: 4 }));
```

The script hashes a versioned cache identity and computes cost with explicitly hypothetical rates. It does not quote vendor pricing or implement a shared production cache.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Change the corpus version, tenant, and prompt version one at a time. Verify each produces a different key.

## You are ready to move on when…

Explain why a semantically similar question can still be unsafe to serve from cache.

## Learn from the source

[Official OpenAI production practices](https://developers.openai.com/api/docs/guides/production-best-practices). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← Prompt injection, permissions, and secure tool execution](../28-security/README.md) · [Building AI HTTP APIs in Node.js →](../30-nodejs-backends/README.md)
