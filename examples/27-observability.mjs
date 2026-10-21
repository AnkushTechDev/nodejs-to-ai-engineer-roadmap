import { randomUUID } from 'node:crypto';
import { performance } from 'node:perf_hooks';
const traceId = randomUUID();
async function span(name, fn) {
  const start = performance.now();
  try {
    const value = await fn();
    console.log(JSON.stringify({ traceId, span: name, status: 'ok', durationMs: performance.now() - start }));
    return value;
  } catch (error) {
    console.log(JSON.stringify({ traceId, span: name, status: 'error', errorType: error.name, durationMs: performance.now() - start }));
    throw error;
  }
}
await span('retrieve', async () => ['policy:1']);
await span('generate-demo', async () => 'Demo answer');
// No user messages, retrieved private text, or secrets enter these logs.
