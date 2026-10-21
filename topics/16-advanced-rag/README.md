# 16. Advanced RAG patterns and when to use them

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Retrieval and RAG  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [14](../14-rag/README.md), [15](../15-hybrid-search-reranking/README.md)

> Improve the specific retrieval failure you observed rather than stacking every RAG technique into one pipeline.

## Preserve a useful amount of context

**Parent-child retrieval** searches small child chunks, then returns a larger parent section. It helps when a precise match lacks surrounding conditions. **Contextual retrieval** enriches chunks with document context before indexing. **Context compression** removes irrelevant material after retrieval, but can accidentally drop important qualifiers.

## Improve the query carefully

**Query rewriting** makes a conversational request self-contained. “What about contractors?” may need the preceding question. **Multi-query retrieval** searches several formulations, then deduplicates results. **HyDE** generates a hypothetical answer and uses it to search; that hypothetical text is a retrieval aid, not factual evidence.

**Multi-hop retrieval** gathers facts across multiple steps. **Agentic RAG** lets a model choose retrieval actions or decide to search again. These methods increase flexibility, but also cost, latency, and the number of ways to fail. Bound the number of searches and retain traceable evidence.

## Freshness and conflict are real requirements

If two policy versions disagree, identify the current authoritative version using metadata. Do not ask a model to guess which is official. Handle temporal queries explicitly: “What was the policy in June?” needs a different filter than “What is it now?” Keep source provenance through query expansion and compression.

Use ablation tests: remove one added component and see whether quality changes. If a complex pipeline barely beats BM25 on your task, the simpler system may be easier to operate. Retrieval metrics and human-reviewed answer examples should both inform the decision.

## Read and run the example

[Full JavaScript example](../../examples/16-advanced-rag.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 16
```

```javascript
// Parent-child retrieval: match a small chunk, return its larger source section.
const parents = new Map([['policy', 'Annual leave: 20 days. Requests need manager approval. Public holidays are separate.']]);
const matchedChild = { id: 'policy:2', parentId: 'policy', text: 'Requests need manager approval.' };
console.log({ matched: matchedChild.text, expandedContext: parents.get(matchedChild.parentId) });
const relevant = new Set(['policy:2', 'policy:3']);
const retrieved = ['policy:2', 'unrelated'];
console.log('Recall@2:', retrieved.filter(id => relevant.has(id)).length / relevant.size);
```

The example expands one matching child into its parent and calculates recall for a small relevant-ID set. It illustrates two mechanics without claiming a complete advanced RAG implementation.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Take a policy with an exception in the next sentence. Compare child-only evidence against parent expansion and inspect whether the exception survives.

## You are ready to move on when…

Choose one advanced technique for a measured failure and explain its added operational cost.

## Learn from the source

[LangChain retrieval architectures](https://docs.langchain.com/oss/javascript/langchain/retrieval). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← BM25, hybrid search, and reranking](../15-hybrid-search-reranking/README.md) · [LangChain for JavaScript developers →](../17-langchain/README.md)
