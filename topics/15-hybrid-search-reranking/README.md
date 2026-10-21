# 15. BM25, hybrid search, and reranking

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Retrieval and RAG  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [14](../14-rag/README.md)

> Exact terms and semantic similarity solve different search problems. Combining them can improve the candidate set.

## Two ways to find the same document

Lexical search matches terms. BM25 rewards query terms that occur in a document while considering term frequency, document length, and how common a term is in the corpus. It is especially useful for product names, identifiers, and error codes.

Dense retrieval compares learned embeddings. It can find paraphrases such as “working from home” and “remote work.” It may be less reliable on a rare exact identifier. **Hybrid search** combines lexical and dense candidates.

## Combine rankings carefully

BM25 and cosine scores live on different scales, so simply adding them can produce misleading rankings. **Reciprocal rank fusion (RRF)** combines positions rather than raw scores. Each list contributes `1 / (constant + rank)` to a document. A document appearing near the top of both lists gains support.

Fusion creates a combined ranking; it is not the same as a reranker. A **cross-encoder reranker** reads the query and candidate together and predicts relevance. It may improve the order of the best candidates, but adds latency and cannot recover a document that never entered the candidate set.

## Measure the tradeoff

Compare BM25-only, dense-only, hybrid, and hybrid-plus-reranker on the same held-out questions. Measure recall before reranking, ranking quality afterward, final answer quality, and end-to-end latency. Include exact codes and paraphrases. Keep permission filters consistent across all retrievers.

A toy exact-match heuristic is useful for seeing the second ranking stage, but should not be described as a learned cross-encoder. Avoid turning an uncalibrated reranker score into a universal confidence percentage.

## Read and run the example

[Full JavaScript example](../../examples/15-hybrid-search-reranking.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 15
```

```javascript
import { reciprocalRankFusion } from './lib/retrieval.mjs';
// Mock rankings, to isolate rank fusion from any particular search service.
const lexical = ['exact-error-code', 'policy', 'faq'];
const semantic = ['faq', 'policy', 'onboarding'];
console.log('Fused IDs and scores:', reciprocalRankFusion([lexical, semantic]));
// A real reranker reads (query, candidate text); fusion alone is not reranking.
const query = 'ERR_42';
const candidates = [{ id: 'a', text: 'ERR_42 means quota exceeded' }, { id: 'b', text: 'Quota overview' }];
console.log('Toy exact-code rerank:', candidates.sort((a, b) => Number(b.text.includes(query)) - Number(a.text.includes(query))));
```

The script fuses two mock ID lists, then demonstrates a separate exact-error-code heuristic. It does not call a real dense retriever or learned reranker.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Add a question containing a rare error code and one containing only a paraphrase. Predict which retriever should help each.

## You are ready to move on when…

Explain the difference between candidate retrieval, rank fusion, and cross-encoder reranking.

## Learn from the source

[pgvector hybrid search guidance](https://github.com/pgvector/pgvector#hybrid-search). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← RAG from first principles](../14-rag/README.md) · [Advanced RAG patterns and when to use them →](../16-advanced-rag/README.md)
