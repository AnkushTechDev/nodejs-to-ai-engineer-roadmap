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
