# 41. GraphRAG, knowledge graphs, and text-to-SQL

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Advanced and specialization  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [14](../14-rag/README.md), [18](../18-tool-calling/README.md), [28](../28-security/README.md)

> Some questions need relationships or exact database calculations rather than another paragraph similarity search.

## Choose the data representation for the question

Vector retrieval asks “which text is similar to this question?” A knowledge graph represents entities and relationships, such as person → team → service. A relational database stores structured records that support joins, counts, filters, and aggregates. These approaches can complement one another.

A multi-hop question such as “Which services are owned by Ada’s team?” can be answered by following relationships. GraphRAG is a family of methods that use graph structure in retrieval or context assembly. Some approaches build entity graphs and community summaries. Entity extraction, merging, permissions, freshness, and summary correctness all require evaluation.

## Text-to-SQL needs a strict boundary

A model can translate a question into a structured query intent or SQL proposal. Unrestricted execution of generated SQL is risky. Prefer approved query templates for narrow tasks. If you support broader SQL generation, parse and constrain it, use a read-only least-privilege role, enforce tenant scope independently, limit runtime and rows, and audit access.

Parameterized values prevent injection through those values; they do not make an arbitrary model-generated SQL program safe. Authorization belongs outside the model. Even read-only queries can expose private data or exhaust resources.

## Combine evidence carefully

Return schema definitions and approved relationships rather than dumping the whole database. Validate calculations using deterministic code. Keep citations or row provenance for answers. Choose graph, SQL, lexical, or vector retrieval according to the task and compare against a simpler baseline.

## Read and run the example

[Full JavaScript example](../../examples/41-graph-rag-and-text-to-sql.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 41
```

```javascript
// Model intent is mapped to server-owned parameterized SQL; never execute arbitrary model SQL.
const authenticatedTenant = 'demo';
const intent = { report: 'open_tickets', status: 'open' };
const reports = {
  open_tickets: { text: 'SELECT id, title FROM tickets WHERE tenant_id = $1 AND status = $2 LIMIT 50', values: [authenticatedTenant, intent.status] },
};
if (!Object.hasOwn(reports, intent.report)) throw Error('Report not allowed');
console.log(reports[intent.report]);
// Graph relationships answer multi-hop questions that similarity alone may miss.
const edges = [{ from: 'Ada', relation: 'MEMBER_OF', to: 'Platform' }, { from: 'Platform', relation: 'OWNS', to: 'BillingAPI' }];
const team = edges.find(edge => edge.from === 'Ada' && edge.relation === 'MEMBER_OF')?.to;
console.log('Services owned by Ada’s team:', edges.filter(edge => edge.from === team && edge.relation === 'OWNS').map(edge => edge.to));
```

The example maps an approved report name to a server-owned parameterized query, then traverses two in-memory graph edges. It does not execute SQL or implement a full GraphRAG index.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Add a second team and ensure the graph traversal follows the correct relationship direction. Add an unsupported report and reject it.

## You are ready to move on when…

Explain why a parameterized query with model-selected values still needs server-owned tenant scope.

## Learn from the source

[Microsoft GraphRAG documentation](https://microsoft.github.io/graphrag/). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← A/B tests, feedback, and continuous improvement](../40-experimentation/README.md) · [Quantization, distillation, batching, and serving →](../42-model-optimization/README.md)
