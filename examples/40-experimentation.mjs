// A/B allocation is stable across requests. IDs should be pseudonymous.
import { createHash } from 'node:crypto';
function variant(userId, experiment) {
  const bucket = createHash('sha256').update(`${experiment}:${userId}`).digest().readUInt32BE(0) % 100;
  return bucket < 50 ? 'control' : 'candidate';
}
for (const id of ['u1', 'u2', 'u3']) console.log(id, variant(id, 'prompt-v2'));
console.log('Record assignment before outcomes; monitor quality, latency, cost, and harm guardrails.');
