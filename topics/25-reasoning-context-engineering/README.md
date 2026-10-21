# 25. Reasoning models and context engineering

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Agents and workflows  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [05](../05-tokens-and-context/README.md), [14](../14-rag/README.md), [21](../21-memory/README.md)

> Getting the right information into a request is often more valuable than adding more instructions.

## Context is a limited working desk

An assistant may need instructions, a current question, a few messages, evidence, and tool outputs. Context engineering is selecting and arranging that information so the model can do the task. It includes retrieval, history trimming, summaries, tool-result shaping, and source versioning.

Treat the context budget like memory in a service. Keep essential instructions and current task details. Prefer a small relevant evidence set over a large pile of loosely related text. Avoid stripping exceptions and qualifiers when compressing a policy.

## Reasoning is a capability, not an authority

Some models support configurable reasoning effort or additional internal computation. This can help with difficult planning or analysis, but it changes latency and token usage. Supported controls vary by model. Evaluate them on your task rather than assuming maximum effort is always worth the cost.

Generated explanations can be useful to users, but they are not a substitute for evidence. Ask for an answer, concise rationale, source IDs, or verifiable intermediate results. Do not require or depend on a model exposing private internal reasoning.

## Assemble context deliberately

Select by relevance, freshness, permissions, and task dependencies. Put related evidence together and retain stable IDs. Keep tool results compact. Summaries should carry source references and be checked when facts matter. An instruction buried inside a retrieved document remains untrusted even if the document is relevant.

If the request cannot fit safely, split the task or ask for a narrower scope. Silent truncation can change the task without the user knowing.

## Read and run the example

[Full JavaScript example](../../examples/25-reasoning-context-engineering.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 25
```

```javascript
// Deliberately select context instead of appending the entire conversation.
const candidates = [
  { id: 'policy', priority: 10, assumedTokens: 200, text: 'Current leave policy' },
  { id: 'old-chat', priority: 1, assumedTokens: 800, text: 'Unrelated conversation' },
  { id: 'question', priority: 100, assumedTokens: 50, text: 'Current user question' },
];
let remaining = 300;
const selected = [...candidates].sort((a, b) => b.priority - a.priority).filter(item => {
  if (item.assumedTokens > remaining) return false;
  remaining -= item.assumedTokens; return true;
});
console.log({ selected, remaining });
// Priority packing is a teaching heuristic. Preserve required instructions and dependencies.
```

The example packs priority-ranked items into an assumed token budget. It illustrates selection only; it is neither a model tokenizer nor an optimal relevance algorithm.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Add a required policy instruction and reject the request if it cannot fit. Optional chat history should never displace required policy.

## You are ready to move on when…

Explain why more context can reduce quality and how you would measure a context-selection change.

## Learn from the source

[LangChain context engineering](https://docs.langchain.com/oss/javascript/langchain/context-engineering). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← Multi-agent systems and orchestration tradeoffs](../24-multi-agent-systems/README.md) · [Evaluating retrieval, answers, and agents →](../26-evaluation/README.md)
