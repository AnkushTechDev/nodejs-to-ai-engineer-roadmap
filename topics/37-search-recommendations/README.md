# 37. Semantic search, clustering, and recommendations

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Advanced and specialization  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [03](../03-machine-learning/README.md), [10](../10-embeddings/README.md), [26](../26-evaluation/README.md)

> Embeddings are useful beyond chatbots: they can connect people to products, content, and related records.

## Search and recommendation have different inputs

Search starts with an explicit query. Recommendation often starts with a profile, recent interaction, item, or task context. Both can use vectors to retrieve candidates, but the definition of useful ranking differs.

A content-based recommender compares item features or embeddings with a user’s interests. Collaborative filtering learns from interaction patterns across users and items. Hybrid recommenders combine signals. A cold-start user or item has little interaction history, so metadata and explicit preferences can help.

## Retrieval is only the first stage

Generate candidates, filter unavailable or unauthorized items, rank them using relevant signals, then apply product constraints such as diversity and freshness. Similarity alone can repeatedly recommend near-duplicates. Do not recommend content the user cannot access simply because its vector is close.

Clustering groups related vectors. It can help explore tickets or organize a knowledge base, but the clusters need human interpretation and validation. A cluster ID is not a trustworthy business label by itself.

## Measure user value responsibly

Offline ranking metrics such as recall@k or nDCG help compare candidate algorithms. Online metrics may include useful engagement, successful task completion, diversity, and satisfaction. Clicks alone can reward sensational or repetitive suggestions. Watch for feedback loops where past recommendations determine all future training data.

Respect user privacy and deletion requests. Store only the preference information you need, and make it possible to reset or correct a profile. Evaluate performance for new users and less common interests, not only the average established user.

## Read and run the example

[Full JavaScript example](../../examples/37-search-recommendations.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 37
```

```javascript
import { cosine } from './lib/math.mjs';
// Synthetic features: [backend, design, AI]. These are not learned product embeddings.
const profile = [0.8, 0.1, 0.9];
const courses = [
  { id: 'rag', features: [0.8, 0, 1], available: true },
  { id: 'design', features: [0, 1, 0.1], available: true },
  { id: 'retired', features: [1, 0, 1], available: false },
];
console.log(courses.filter(course => course.available)
  .map(course => ({ id: course.id, score: cosine(profile, course.features) }))
  .sort((a, b) => b.score - a.score));
```

The example ranks available courses using synthetic features and a synthetic profile. It illustrates candidate filtering and scoring, not a trained recommendation system.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Add a diversity rule so the top three results do not all cover the same topic. Explain how that changes similarity ranking.

## You are ready to move on when…

Explain cold start and why a high similarity score may still produce a poor recommendation.

## Learn from the source

[Google recommendation systems course](https://developers.google.com/machine-learning/recommendation). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← Queues, incremental indexing, and data lifecycle](../36-data-pipelines/README.md) · [Testing deterministic code and probabilistic behavior →](../38-testing-ai-systems/README.md)
