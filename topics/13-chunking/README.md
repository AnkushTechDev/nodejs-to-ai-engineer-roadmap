# 13. Chunking: splitting text without losing meaning

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Retrieval and RAG  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [12](../12-document-ingestion/README.md)

> Searching a whole book is imprecise, but searching disconnected fragments can remove the facts needed to answer.

## The size of the evidence matters

A **chunk** is a piece of a source document stored as a retrievable unit. If chunks are too large, retrieval may return many unrelated details. If too small, a result such as “30 days” may lose the heading that tells you whether it describes a warranty, leave balance, or payment deadline.

**Fixed-size chunking** is simple. **Recursive splitting** tries larger boundaries such as sections and paragraphs before smaller ones. **Sentence splitting** preserves sentences. **Semantic chunking** attempts to detect meaning shifts, but costs more and still needs evaluation. Code and tables often need structure-aware splitting.

## Overlap helps, but is not free

Overlap repeats some text between neighboring chunks so a fact near a boundary remains visible. It also increases storage, embedding work, and duplicate retrieval. Deduplicate or diversify retrieved evidence when several chunks say the same thing.

Keep a parent document or section ID and stable chunk position. A heading such as “Expense deadlines” can be prepended as context, provided you preserve what came from the source and what was added by preprocessing. Use token-aware limits for the chosen embedding model; the word-based demo is intentionally simpler.

## Choose with evidence

There is no universally best chunk size. Try a few sizes on a question set with known relevant passages. Measure retrieval recall, answer quality, context usage, and latency. Keep the parser and embedding model fixed while comparing chunk strategies so you can identify the source of any improvement.

## Read and run the example

[Full JavaScript example](../../examples/13-chunking.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 13
```

```javascript
import { chunkText } from './lib/retrieval.mjs';
const text = 'Leave requires approval from your manager. Submit requests before booking travel. Public holidays do not use your annual leave allowance.';
console.log(chunkText(text, { size: 10, overlap: 3 }).map((text, i) => ({ id: `policy:${i}`, text })));
// A word window can cut a sentence. Compare sentence/heading boundaries in the exercise.
```

The helper makes overlapping word windows and validates size and overlap to prevent invalid settings or an endless loop. The output shows how a sentence can be split.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Compare word-window chunks against paragraph-based chunks for a two-page handbook. Write five questions that require a complete policy condition.

## You are ready to move on when…

Explain the tradeoff between small chunks, large chunks, and overlap.

## Learn from the source

[LangChain text splitter integrations](https://docs.langchain.com/oss/javascript/integrations/splitters). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← Document loading, parsing, and cleaning](../12-document-ingestion/README.md) · [RAG from first principles →](../14-rag/README.md)
