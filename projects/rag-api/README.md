# Capstone 3: local HTTP retrieval API

[Project index](../README.md) · [Node.js backend chapter](../../topics/30-nodejs-backends/README.md)

A small Node.js HTTP server with bounded JSON input and BM25 retrieval. It returns excerpts from the fictional handbook; it does not call a model.

```bash
npm run serve
# In a second terminal:
curl http://127.0.0.1:3000/health
curl -X POST http://127.0.0.1:3000/ask \
  -H 'Content-Type: application/json' \
  -d '{"question":"How much annual leave?"}'
```

PowerShell users can use `Invoke-RestMethod -Uri http://127.0.0.1:3000/ask -Method Post -ContentType 'application/json' -Body '{"question":"How much annual leave?"}'`.

## Contract

| Request | Result |
| --- | --- |
| `GET /health` | 200 status JSON |
| Valid `POST /ask` | 200 excerpt sources or an empty abstention result |
| Missing/empty/oversized question or malformed JSON | 400 |
| Body above 16 KiB | 413 |
| Content type other than JSON | 415 |
| Wrong method on `/ask` | 405 |
| Unknown route | 404 |

The question limit is 2,000 JavaScript UTF-16 code units. The body limit is bytes. Client-supplied tenant IDs are ignored: the local server always uses the demo identity and filters the corpus before ranking. Responses disable caching and avoid exposing stack traces.

[server.mjs](server.mjs) binds to `127.0.0.1`, sets network timeouts, and handles shutdown. `PORT` can select a different port. `npm test` starts an ephemeral server and checks the HTTP contract.

## Before deploying an extension

Add real authentication and server-derived permissions, persistent storage, distributed request/concurrency limits, TLS at the appropriate boundary, infrastructure deadlines, and operational telemetry. If adding a provider, propagate cancellation and test refusal, timeout, and partial-output behavior. The local timeout values and fixture corpus are learning defaults, not production capacity settings.
