# 11. Vector databases, pgvector, and indexes

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Retrieval and RAG  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [10](../10-embeddings/README.md)

> Finding a few relevant vectors among millions requires storage, indexing, metadata, and careful filtering.

## A vector store is still a database

Store the vector with a stable ID, document text or text reference, tenant ID, source version, and other useful metadata. A search compares a query vector to stored vectors and returns the closest candidates. Your application then uses their text, not the raw coordinates, as evidence.

**Exact search** compares every eligible vector. It is easy to reason about and provides a useful baseline. **Approximate nearest neighbor (ANN)** indexes trade some recall for speed. HNSW builds a navigable graph; IVFFlat partitions vectors into groups. Index settings, dataset size, query filters, and hardware all affect performance.

## Pick a store for your workload

PostgreSQL with pgvector is convenient when your team already operates Postgres and needs SQL metadata queries. Dedicated vector systems such as Qdrant, Weaviate, Milvus, or managed services offer different operational and scaling tradeoffs. Compare features and benchmarks on your data rather than assuming a universal winner.

## Permissions are part of retrieval

Filter by the authenticated tenant and document permissions before returning evidence. Filtering only after a small top-k search can lose good authorized results. With ANN, selective filtering may require tuning or an alternate plan; measure recall under the actual filters. Use database roles and row-level security where appropriate.

The SQL companion uses three synthetic dimensions solely to show query syntax. Real embeddings need a column and index compatible with the selected model’s dimensions. Parameterize queries; do not concatenate model-generated text into SQL. Version migrations and deletions so removed documents stop appearing.

## Read and run the example

[Full JavaScript example](../../examples/11-vector-databases.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 11
```

```javascript
import { cosine } from './lib/math.mjs';
const rows = [
  { id: 'a', tenantId: 'demo', vector: [1, 0] },
  { id: 'b', tenantId: 'demo', vector: [0.4, 0.8] },
  { id: 'secret', tenantId: 'other', vector: [1, 0] },
];
const authenticatedTenant = 'demo';
const result = rows.filter(row => row.tenantId === authenticatedTenant)
  .map(row => ({ id: row.id, score: cosine([1, 0], row.vector) }))
  .sort((a, b) => b.score - a.score).slice(0, 2);
console.log(result);
// Exact in-memory search. pgvector.sql shows the database equivalent.
```

The JavaScript example performs exact cosine ranking after tenant filtering. [pgvector.sql](../../examples/pgvector.sql) demonstrates a small database query, but does not provision PostgreSQL.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Add five synthetic vectors and compare top-k results before and after tenant filtering. Explain why a secret vector must never enter the returned context.

## You are ready to move on when…

Explain exact versus approximate search and why vector similarity does not replace authorization.

## Learn from the source

[pgvector official repository and documentation](https://github.com/pgvector/pgvector). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← Embeddings and semantic similarity](../10-embeddings/README.md) · [Document loading, parsing, and cleaning →](../12-document-ingestion/README.md)
