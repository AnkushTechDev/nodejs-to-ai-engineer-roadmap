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
