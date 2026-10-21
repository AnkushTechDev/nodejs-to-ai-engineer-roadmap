import http from 'node:http';
import { pathToFileURL } from 'node:url';
import { handbook } from '../../examples/lib/data.mjs';
import { retrieve } from '../../examples/lib/retrieval.mjs';

const MAX_BYTES = 16 * 1024;
class InputError extends Error { constructor(status, message) { super(message); this.status = status; } }
async function readJson(req) {
  if (req.headers['content-type']?.split(';')[0].trim().toLowerCase() !== 'application/json') throw new InputError(415, 'Content-Type must be application/json');
  const bytes = await new Promise((resolve, reject) => {
    const chunks = []; let size = 0;
    const cleanup = () => {
      req.off('data', onData); req.off('end', onEnd);
      req.off('error', onError); req.off('aborted', onAborted);
    };
    const onError = error => { cleanup(); reject(error); };
    const onAborted = () => onError(new InputError(400, 'Request aborted'));
    const onEnd = () => { cleanup(); resolve(Buffer.concat(chunks)); };
    const onData = chunk => {
      size += chunk.length;
      if (size > MAX_BYTES) {
        cleanup();
        // Drain without buffering so a chunked request can receive a 413 response.
        req.resume();
        reject(new InputError(413, 'Request body is too large'));
      } else chunks.push(chunk);
    };
    req.on('data', onData); req.on('end', onEnd);
    req.on('error', onError); req.on('aborted', onAborted);
  });
  try { return JSON.parse(bytes.toString('utf8')); }
  catch { throw new InputError(400, 'Invalid JSON'); }
}
function send(res, status, payload) {
  if (res.destroyed) return;
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  res.end(JSON.stringify(payload));
}
export function createServer() {
  const server = http.createServer(async (req, res) => {
    try {
      if (req.url === '/health' && req.method === 'GET') return send(res, 200, { status: 'ok' });
      if (req.url !== '/ask') return send(res, 404, { error: 'Not found' });
      if (req.method !== 'POST') return send(res, 405, { error: 'Use POST' });
      const declaredSize = Number(req.headers['content-length']);
      if (declaredSize > MAX_BYTES) { req.resume(); throw new InputError(413, 'Request body is too large'); }
      const body = await readJson(req);
      if (!body || typeof body.question !== 'string' || !body.question.trim() || body.question.length > 2000)
        throw new InputError(400, 'question must be 1..2000 characters');
      // Fixed local demo identity. A real service derives this from authenticated middleware.
      // Client-supplied tenantId is ignored; no client can select another tenant here.
      const hits = retrieve(body.question.trim(), handbook, { tenantId: 'demo', k: 2 });
      send(res, 200, { mode: hits.length ? 'retrieved-excerpts' : 'abstain', sources: hits.map(({ id, text }) => ({ id, text })) });
    } catch (error) {
      send(res, error instanceof InputError ? error.status : 500, { error: error instanceof InputError ? error.message : 'Internal error' });
    }
  });
  server.requestTimeout = 10_000;
  server.headersTimeout = 10_000;
  server.timeout = 10_000;
  return server;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.env.PORT || 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw Error('PORT must be 1..65535');
  const server = createServer();
  server.listen(port, '127.0.0.1', () => console.log(`Local retrieval demo: http://127.0.0.1:${port}`));
  const stop = () => { server.close(); server.closeIdleConnections(); };
  process.on('SIGTERM', stop); process.on('SIGINT', stop);
}
