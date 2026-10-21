# 01. What an AI engineer actually builds

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Foundations  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** JavaScript basics, async/await, and using npm

> You already know how to build services. AI engineering adds a component whose output must be measured and checked rather than assumed correct.

## The idea in plain language

Imagine adding a very capable writing assistant to an Express application. It can explain a ticket or draft a response, but it can misunderstand the request. Your job is to give it the right information, constrain its actions, check its work, and make the whole service reliable.

**AI** is the broad field of building systems that perform tasks associated with intelligence. **Machine learning (ML)** learns patterns from examples. **Deep learning** uses neural networks with many layers. **Generative AI** creates outputs such as text, images, and audio. An **LLM**, or large language model, is a model trained on large amounts of language-related data. These terms overlap; they are not interchangeable.

## Your existing skills transfer

| Node.js experience | AI engineering use |
| --- | --- |
| REST APIs and SDKs | Call model and embedding services |
| Databases and indexes | Store documents, vectors, permissions, and history |
| Queues and workers | Ingest documents and process long-running jobs |
| Authentication | Decide which evidence and tools a user may access |
| Tests and monitoring | Evaluate answers and detect regressions |

An application-focused AI engineer usually integrates models. An ML engineer may train and serve predictive models. A researcher develops and tests new methods. Job titles vary, so look at the actual work.

## Start with a problem

“Answer employee questions from our handbook” is a measurable problem. “Add agents everywhere” is a technology choice. Define who uses the feature, which evidence it may read, what a good answer looks like, and what happens when it cannot answer.

## Read and run the example

[Full JavaScript example](../../examples/01-ai-engineering.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 01
```

```javascript
// An AI feature still needs ordinary software boundaries.
const request = { userId: 'u1', text: 'Summarize my support ticket' };
const pipeline = [
  ['validate', value => { if (!value.text?.trim()) throw Error('Text required'); return value; }],
  ['prepare context', value => ({ ...value, context: 'Ticket: package arrived late.' })],
  // Deterministic stand-in so this architecture lesson costs nothing.
  ['demo model boundary', value => ({ ...value, answer: 'The package arrived late.' })],
  ['format', value => ({ answer: value.answer, source: 'ticket' })],
];
let state = request;
for (const [name, step] of pipeline) { state = step(state); console.log(name, state); }
```

The example passes a request through validation, context preparation, a clearly labeled fake model boundary, and response formatting. The fake keeps this first lesson focused on architecture.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Write a one-paragraph specification for a support-ticket summarizer. Include its input, output, data permissions, and failure behavior.

## You are ready to move on when…

Explain why a valid HTTP 200 response from a model does not prove the answer is correct.

## Learn from the source

[Google ML Crash Course](https://developers.google.com/machine-learning/crash-course). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[Start here](../../START_HERE.md) · [The useful math: vectors, probability, and gradients →](../02-math-for-ai/README.md)
