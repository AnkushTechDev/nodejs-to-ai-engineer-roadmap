# 36. Queues, incremental indexing, and data lifecycle

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Advanced and specialization  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [12](../12-document-ingestion/README.md), [13](../13-chunking/README.md), [31](../31-deployment-llmops/README.md)

> A search index that cannot update or delete reliably becomes a source of stale or unauthorized answers.

## Ingestion is a workflow, not a one-time script

A typical pipeline receives a source change, validates it, parses content, creates chunks, embeds them, writes an index version, and records completion. Use background workers for large jobs so an HTTP request does not wait for the entire corpus.

A queue decouples ingestion from the request path. Jobs need stable IDs, bounded retries, timeouts, and a dead-letter path for repeated failures. At-least-once delivery means a job can run more than once. Design idempotent writes rather than assuming exactly-once execution across independent services.

## Track source and content versions

A content hash helps skip unchanged documents. Keep a durable ledger of processing state and the index version produced. Mark a job complete only after its required writes succeed. An outbox pattern can coordinate database changes and event publication without a fragile “write then hope the message sends” gap.

Build new versions before switching readers when possible. Remove stale chunks from the active version. Handle document deletions, revoked access, and legal retention requirements across vector stores, raw text, summaries, caches, and backups according to policy.

## Scale with limits

Batch embedding requests within provider limits. Bound worker concurrency and respect rate limits. Retry transient failures with backoff; quarantine corrupt files for inspection. Record progress in units such as processed documents rather than inventing a percentage when the total is unknown.

A pipeline can succeed technically while extracting bad text. Add data-quality checks and sample inspection alongside job completion metrics.

## Read and run the example

[Full JavaScript example](../../examples/36-data-pipelines.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 36
```

```javascript
import { createHash } from 'node:crypto';
const jobs = [{ sourceId: 'a', text: 'Policy version 1' }, { sourceId: 'a', text: 'Policy version 1' }, { sourceId: 'a', text: 'Policy version 2' }];
const processed = new Set();
for (const job of jobs) {
  const version = createHash('sha256').update(job.text).digest('hex');
  const key = `${job.sourceId}:${version}`;
  if (processed.has(key)) { console.log('Skip duplicate'); continue; }
  // Commit index writes before marking processed. Production uses a durable ledger/outbox.
  console.log('Index', job.sourceId, version.slice(0, 8));
  processed.add(key);
}
```

The in-memory ledger skips an identical source version and processes changed text. It demonstrates deduplication only; it is not a durable queue or transaction.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Simulate a failure after an index write but before ledger completion. Design an upsert key that makes the retry harmless.

## You are ready to move on when…

Explain how at-least-once delivery changes your worker design and how deletions propagate.

## Learn from the source

[BullMQ idempotent job guidance](https://docs.bullmq.io/patterns/idempotent-jobs). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← Fine-tuning, LoRA, and preference optimization](../35-fine-tuning/README.md) · [Semantic search, clustering, and recommendations →](../37-search-recommendations/README.md)
