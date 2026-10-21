# 47. TypeScript contracts and the JavaScript AI ecosystem

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Career and deeper study  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [08](../08-structured-outputs/README.md), [17](../17-langchain/README.md), [30](../30-nodejs-backends/README.md)

> Use TypeScript to make your own contracts clearer while validating all data that crosses a runtime boundary.

## Types help at development time

TypeScript can describe model request and response contracts, tool arguments, graph state, and discriminated results. A union such as `generated | abstain | failed` forces callers to handle different outcomes. Typed SDKs improve editor guidance and catch some integration mistakes.

Types are erased at runtime. A network response can still violate the interface you declared. Parse external input with a runtime schema or explicit validation. Do not use a type assertion to pretend that arbitrary model output is trustworthy.

## Choose a small stack deliberately

A provider SDK gives direct access to its features. LangChain offers common model/tool interfaces and integrations. LangGraph gives explicit stateful orchestration. UI-focused AI libraries can simplify streaming and client state. Local runtimes and browser inference libraries solve different deployment problems. None is required for learning the underlying architecture.

When considering libraries such as the Vercel AI SDK, LlamaIndex.TS, Transformers.js, or TensorFlow.js, read the installed version’s official documentation and verify the capability you need. Do not assume Python and JavaScript implementations have feature parity. Compare maintenance, supported providers, runtime constraints, bundle size, testing, and escape hatches.

## Keep boundaries portable

Define narrow application interfaces such as `generate`, `embed`, and `search` only where they help. Preserve provider-specific metadata you need for refusals, usage, streaming, or tool calls rather than flattening everything into a string. Share schemas between handlers and clients when useful, but keep server secrets and authorization code out of browser bundles.

## Read and run the example

[Full JavaScript example](../../examples/47-typescript-and-js-ecosystem.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 47
```

```javascript
/** @typedef {{kind: 'generated', text: string} | {kind: 'abstain', reason: string}} Result */
/** @param {unknown} input @returns {Result} */
function parseResult(input) {
  if (input && typeof input === 'object') {
    if (input.kind === 'generated' && typeof input.text === 'string') return { kind: 'generated', text: input.text };
    if (input.kind === 'abstain' && typeof input.reason === 'string') return { kind: 'abstain', reason: input.reason };
  }
  throw new TypeError('Invalid result at runtime');
}
const result = parseResult({ kind: 'abstain', reason: 'No evidence' });
console.log(result.kind === 'generated' ? result.text : result.reason);
```

The JavaScript example uses JSDoc contracts plus a runtime discriminator check. The optional [TypeScript companion](../../examples/typescript-contract.ts) shows a union without requiring a build step for the repository.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Extend the result union with a retryable failure and update every branch that consumes it. Validate the same shape at the HTTP boundary.

## You are ready to move on when…

Explain why a TypeScript interface is not input validation and when an adapter would hide too much provider behavior.

## Learn from the source

[TypeScript handbook](https://www.typescriptlang.org/docs/handbook/intro.html). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← Image generation and diffusion fundamentals](../46-image-generation-diffusion/README.md) · [Datasets, labeling, and reproducible experiments →](../48-datasets-and-labeling/README.md)
