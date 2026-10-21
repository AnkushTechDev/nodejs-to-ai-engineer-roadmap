import { handbook } from './lib/data.mjs';
import { retrieve } from './lib/retrieval.mjs';
const cases = [
  { question: 'annual leave days', relevant: ['leave-policy-v1'] },
  { question: 'expense receipts purchase', relevant: ['expenses-policy-v1'] },
  { question: 'remote work', relevant: ['remote-policy-v1'] },
];
let sumRecall = 0, reciprocalRank = 0;
for (const row of cases) {
  const ids = retrieve(row.question, handbook, { tenantId: 'demo', k: 2 }).map(doc => doc.id);
  const recall = row.relevant.filter(id => ids.includes(id)).length / row.relevant.length;
  const first = ids.findIndex(id => row.relevant.includes(id));
  sumRecall += recall; reciprocalRank += first < 0 ? 0 : 1 / (first + 1);
  console.log({ question: row.question, ids, recall });
}
console.log({ meanRecallAt2: sumRecall / cases.length, MRR: reciprocalRank / cases.length });
// Fixture retrieval metrics, not end-to-end factual answer quality.
