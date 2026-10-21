# 27. Tracing, metrics, and debugging AI requests

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Production engineering  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [26](../26-evaluation/README.md)

> When an answer fails, you need to know what was retrieved, which tools ran, and where time was spent.

## Follow one request across its steps

A **trace** represents the request. A **span** represents work such as retrieval, reranking, model generation, or a tool call. A trace ID connects logs across components. Span relationships help identify the step that caused a slow or incorrect response.

Capture useful metadata: prompt version, model ID, corpus version, retrieved IDs, token usage, tool names, error category, and duration. Track time to first token separately from completion time. Aggregate p50, p95, and p99 latency instead of relying only on averages.

## Keep quality visible

A service can be healthy at the HTTP layer while producing unsupported answers. Monitor abstention rate, citation errors, retrieval misses, tool failures, and user feedback. Changes in source data or query patterns can reduce quality even when code has not changed.

OpenTelemetry offers a general tracing standard. AI-specific systems such as LangSmith add workflow inspection and evaluation features. Choose a tool based on your operational needs and data policies, and keep useful signals accessible without locking business logic into a dashboard.

## Logs can become a leak

Do not log API keys or complete private prompts by default. Prefer IDs and redacted metadata. If sampled content is needed for debugging, define access, retention, redaction, and deletion rules. A regex that removes email addresses does not guarantee complete PII removal.

Avoid high-cardinality labels such as unique user IDs in metrics. Put request-specific identifiers in controlled traces or logs. Alerts should describe meaningful failures and point to a concrete investigation path.

## Read and run the example

[Full JavaScript example](../../examples/27-observability.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 27
```

```javascript
import { randomUUID } from 'node:crypto';
import { performance } from 'node:perf_hooks';
const traceId = randomUUID();
async function span(name, fn) {
  const start = performance.now();
  try {
    const value = await fn();
    console.log(JSON.stringify({ traceId, span: name, status: 'ok', durationMs: performance.now() - start }));
    return value;
  } catch (error) {
    console.log(JSON.stringify({ traceId, span: name, status: 'error', errorType: error.name, durationMs: performance.now() - start }));
    throw error;
  }
}
await span('retrieve', async () => ['policy:1']);
await span('generate-demo', async () => 'Demo answer');
// No user messages, retrieved private text, or secrets enter these logs.
```

The example records JSON spans with duration, status, and a shared trace ID. It deliberately avoids logging prompt bodies or private evidence.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Add a nested reranking span and simulate a failure. Check that an error is recorded without dumping input text.

## You are ready to move on when…

Explain the difference between logs, metrics, traces, and evaluation results.

## Learn from the source

[OpenTelemetry JavaScript documentation](https://opentelemetry.io/docs/languages/js/). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← Evaluating retrieval, answers, and agents](../26-evaluation/README.md) · [Prompt injection, permissions, and secure tool execution →](../28-security/README.md)
