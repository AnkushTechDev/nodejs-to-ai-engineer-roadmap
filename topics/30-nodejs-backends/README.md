# 30. Building AI HTTP APIs in Node.js

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Production engineering  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [06](../06-model-apis/README.md), [09](../09-streaming/README.md), [28](../28-security/README.md)

> An AI endpoint needs the same backend discipline as your other endpoints, plus explicit model budgets and cancellation.

## Validate before doing expensive work

Authenticate the caller, derive their permission scope on the server, validate the request body, and enforce size limits before retrieval or generation. Reject malformed JSON and unsupported content types. A TypeScript type disappears at runtime, so it cannot validate a network request by itself.

Keep request handlers small. Separate validation, retrieval, provider access, and response formatting. This makes fake-provider tests possible without accidentally calling a paid model. Use dependency injection when it helps isolate network behavior.

## Concurrency and lifecycle

Node.js handles network I/O well, but CPU-heavy parsing or inference can block the event loop. Move heavy jobs to workers or separate services. Apply request deadlines and bounded concurrency. Abort upstream model requests when the client disconnects where supported; otherwise wasted work can continue after the response is gone.

For long jobs, return a job ID and provide status or completion events rather than holding a short-lived HTTP connection forever. Keep queue payloads small and store large documents in appropriate object storage.

## Design honest responses

Distinguish a generated answer, retrieved excerpts, an abstention, and a failure. Include source IDs and useful request metadata. Avoid exposing stack traces or private provider errors. Use HTTP status codes consistently and define which failures clients may retry.

The capstone server binds to loopback, uses a fixed demo tenant, and returns retrieved excerpts. It is a local learning service. To deploy it, add real authentication, authorization, persistent storage, distributed rate limits, infrastructure deadlines, and a reviewed generation boundary.

## Read and run the example

[Full JavaScript example](../../examples/30-nodejs-backends.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 30
```

```javascript
// Body validation happens before retrieval or a paid API call.
export function validateQuestion(body) {
  if (!body || typeof body.question !== 'string' || !body.question.trim() || body.question.length > 2000)
    throw new TypeError('question must be 1..2000 characters');
  return { question: body.question.trim() };
}
for (const body of [{ question: 'What is RAG?' }, { question: '' }, { question: 42 }]) {
  try { console.log(validateQuestion(body)); } catch (error) { console.log(error.message); }
}
console.log('Run npm run serve for the HTTP RAG capstone.');
```

The topic script validates a question and shows rejected inputs. The [RAG API project](../../projects/rag-api/README.md) demonstrates a bounded JSON body and permission-filtered retrieval over HTTP.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Send valid JSON, malformed JSON, a large body, and an empty question to the capstone. Record the status codes.

## You are ready to move on when…

Explain how you would handle a client disconnect during a streamed model call.

## Learn from the source

[Node.js HTTP documentation](https://nodejs.org/docs/latest-v22.x/api/http.html). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← Cost, latency, caching, and reliability budgets](../29-cost-latency-caching/README.md) · [Deployment, versioning, and LLMOps →](../31-deployment-llmops/README.md)
