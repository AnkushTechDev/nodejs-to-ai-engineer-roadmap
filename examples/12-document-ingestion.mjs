import { createHash } from 'node:crypto';
const raw = '  Annual leave policy\r\nEmployees receive 20 days.  ';
const text = raw.replace(/\r\n/g, '\n').trim();
const doc = {
  id: 'leave-policy', tenantId: 'demo', source: 'handbook.md',
  version: createHash('sha256').update(text).digest('hex'), text,
};
console.log(doc);
console.log('Ingest the same hash twice: skip re-embedding. Change text: build a new version.');
