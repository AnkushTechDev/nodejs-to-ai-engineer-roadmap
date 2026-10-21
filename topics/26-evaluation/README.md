# 26. Evaluating retrieval, answers, and agents

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Production engineering  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [14](../14-rag/README.md), [19](../19-agents/README.md)

> You cannot improve a system reliably if “looks good to me” is its only quality metric.

## Make a small trustworthy test set

Collect realistic questions, expected evidence, acceptable answers, and cases where the system should abstain. Include ambiguous wording, outdated documents, adversarial content, and permission boundaries. Keep a held-out set that is not used to tune prompts.

For retrieval, **recall@k** measures how much relevant evidence appears among the first k results. **Precision@k** measures how much of those k results is relevant. **MRR** rewards the position of the first relevant result. **nDCG** can incorporate graded relevance and position.

## Evaluate the whole answer separately

Check factual correctness, grounding in supplied evidence, citation validity, completeness, helpfulness, and appropriate abstention. A grounded answer can still be incomplete. A correctly formatted citation can point to an unrelated source. Measure latency, cost, and failure rate alongside quality.

For agents, inspect tool selection, argument validity, authorization, unnecessary calls, task completion, and stopping behavior. Evaluate both individual components and end-to-end tasks.

## Use model judges carefully

A model can score outputs with a rubric, but it may prefer verbosity, position, or its own style. Calibrate against human-reviewed examples, blind the comparison where possible, and periodically inspect disagreements. A judge’s score is another measurement with error, not objective truth.

Version datasets, prompts, retrieval settings, models, and results. Report sample size and uncertainty. A score from three friendly fixture questions demonstrates wiring; it does not prove production quality. Add regression cases whenever a real failure is understood.

## Read and run the example

[Full JavaScript example](../../examples/26-evaluation.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 26
```

```javascript
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
```

The script runs three labeled retrieval cases and prints mean recall@2 and MRR. It makes no model calls and does not measure final answer quality.

**Expected behavior:** Per-question retrieved IDs plus mean recall@2 and MRR for the tiny fixture set.

## Try it yourself

Add ten questions, including synonyms, exact identifiers, unsupported requests, and a private document. Label relevant IDs before looking at results.

## You are ready to move on when…

Explain how you would tell whether a RAG regression came from retrieval or generation.

## Learn from the source

[LangSmith evaluation concepts](https://docs.langchain.com/langsmith/evaluation). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← Reasoning models and context engineering](../25-reasoning-context-engineering/README.md) · [Tracing, metrics, and debugging AI requests →](../27-observability/README.md)
