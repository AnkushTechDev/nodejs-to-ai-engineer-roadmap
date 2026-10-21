import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import http from 'node:http';
import { createServer } from '../projects/rag-api/server.mjs';

test('HTTP contract rejects bad inputs before retrieval and uses a server-owned tenant', async t => {
  const server = createServer();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => new Promise(resolve => { server.close(resolve); server.closeAllConnections(); }));
  const base = `http://127.0.0.1:${server.address().port}`;
  const post = (body, contentType = 'application/json') => fetch(`${base}/ask`, { method: 'POST', headers: { 'Content-Type': contentType }, body });
  assert.equal((await fetch(`${base}/health`)).status, 200);
  assert.equal((await fetch(`${base}/ask`)).status, 405);
  assert.equal((await fetch(`${base}/unknown`)).status, 404);
  assert.equal((await post('{')).status, 400);
  assert.equal((await post('null')).status, 400);
  assert.equal((await post(JSON.stringify({ question: '' }))).status, 400);
  assert.equal((await post(JSON.stringify({ question: 'x'.repeat(2001) }))).status, 400);
  assert.equal((await post('{}', 'text/plain')).status, 415);
  assert.equal((await post('x'.repeat(17 * 1024))).status, 413);
  const chunkedStatus = await new Promise((resolve, reject) => {
    const request = http.request(`${base}/ask`, { method: 'POST', headers: { 'Content-Type': 'application/json' } }, response => {
      response.resume(); resolve(response.statusCode);
    });
    request.on('error', reject);
    request.write('x'.repeat(9 * 1024));
    request.end('x'.repeat(9 * 1024));
  });
  assert.equal(chunkedStatus, 413);
  const response = await post(JSON.stringify({ question: 'annual leave days', tenantId: 'other-company' }));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  const result = await response.json();
  assert.equal(result.mode, 'retrieved-excerpts');
  assert.ok(result.sources.some(source => source.id === 'leave-policy-v1'));
  assert.ok(result.sources.every(source => source.id !== 'private-policy-v1'));
  const empty = await (await post(JSON.stringify({ question: 'zzzzunknown' }))).json();
  assert.equal(empty.mode, 'abstain');
  assert.deepEqual(empty.sources, []);
});
