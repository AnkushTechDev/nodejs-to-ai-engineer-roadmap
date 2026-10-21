# 38. Testing deterministic code and probabilistic behavior

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Production engineering  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [26](../26-evaluation/README.md), [28](../28-security/README.md), [30](../30-nodejs-backends/README.md)

> Traditional tests and AI evaluations answer different questions. A reliable repository needs both.

## Test the code you control

Use deterministic unit tests for chunking boundaries, vector validation, tenant filters, cache identity, schema handling, and approval logic. Integration tests cover HTTP status codes, malformed requests, database contracts, and provider error handling. These should not require spending tokens.

A fake model lets you test orchestration: return a known response, refusal, timeout, or malformed result and verify how your application reacts. A fake does not tell you whether a real model answers well. Keep that distinction visible in test names and reports.

## Evaluate the model-dependent behavior

Run versioned task sets against real models when appropriate and explicitly configured. Compare support, correctness, tool use, abstention, latency, and cost. Avoid brittle exact-string assertions on free-form answers unless the task genuinely requires exact text.

Use metamorphic checks where useful: changing an unauthorized tenant should not expose private evidence; rephrasing a question should not change a stable policy fact; adding an unrelated paragraph should not override access rules. These checks still need carefully defined expectations.

## Keep CI predictable

Offline checks should run on every change without credentials. Paid evaluations can be a separate manual or protected job with budget limits. Never put real keys into pull-request logs. Verify that examples do not make network requests unless their execution mode explicitly allows it.

When a real incident occurs, add the smallest useful regression case. A passing suite proves the tested behaviors, not complete factual correctness or production security. Record what remains untested.

## Read and run the example

[Full JavaScript example](../../examples/38-testing-ai-systems.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 38
```

```javascript
import assert from 'node:assert/strict';
import { retrieve } from './lib/retrieval.mjs';
const docs = [{ id: 'private', tenantId: 'other', text: 'annual leave secret' }];
assert.deepEqual(retrieve('leave', docs, { tenantId: 'demo' }), []);
assert.throws(() => retrieve('leave', docs, {}), /tenant/);
// A scripted fake makes infrastructure tests deterministic; it cannot measure model quality.
const fakeModel = async () => ({ text: 'I do not know.', usage: { input: 10, output: 5 } });
assert.equal((await fakeModel()).text, 'I do not know.');
console.log('Isolation and fake-provider checks passed. Run npm test for the repository suite.');
```

The example asserts tenant isolation and a fake-provider contract. The repository test suite adds boundary tests, HTTP integration checks, workflow approval binding, and an MCP round trip.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Write a test where a correct-looking answer has a nonexistent citation. Decide whether the failure belongs to a deterministic check or a model evaluation.

## You are ready to move on when…

Explain why fake-provider tests cannot replace real model evaluations.

## Learn from the source

[Node.js 22 test runner](https://nodejs.org/docs/latest-v22.x/api/test.html). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← Semantic search, clustering, and recommendations](../37-search-recommendations/README.md) · [Responsible AI, privacy, and accessible products →](../39-responsible-ai/README.md)
