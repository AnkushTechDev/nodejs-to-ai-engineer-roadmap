# Verification and practical limits

[Roadmap](README.md) · [Sources](RESOURCES.md)

## What the automated checks cover

- All 48 numbered topics have an indexed README and a matching JavaScript example.
- JavaScript module syntax and local Markdown links/heading anchors are checked.
- All 39 chapters marked `offline` can run without credentials or external services after dependency installation.
- Deterministic tests cover vector and chunk boundaries, permission-filtered retrieval, rank fusion, citation ID validation, action approval binding, and replay behavior.
- HTTP integration tests cover malformed/oversized input, status codes, and server-owned tenant filtering.
- An MCP client test launches the actual stdio server, discovers the tool, executes it, and checks invalid arguments.
- LangGraph routing and interrupt/resume run as part of the offline chapter sweep.

## Creation-time validation

Verified locally on **21 October 2026** using Node.js **22.23.2**. Dependencies are recorded in `package-lock.json`. The CI configuration also targets Node 24, but a local Node 24 run is not claimed here. The HTTP tests require permission to open a temporary loopback socket; this environment’s initial sandbox blocked that socket, and the full suite passed when loopback access was allowed.

The committed commands are designed to run without provider credentials. Real OpenAI generation/embeddings/vision calls were not executed. The Ollama example requires separately downloaded weights and was not run against a local model. The pgvector SQL fixture was not executed against a PostgreSQL service. Browser streaming, speech services, OCR engines, real payment execution, and distributed deployment are explained extension work rather than hidden dependencies.

## What passing checks do not prove

A valid schema is not a correct answer. A known citation ID is not proof that a claim is supported. A tiny retrieval fixture is not a production quality benchmark. The in-process approval ledger is not a durable payment system. Source URLs are reading references; `npm run check` does not fetch or validate external pages.

For a real deployment, add representative held-out evaluations, authentication, persistent storage, deployment-specific limits, monitoring, and task-appropriate review. Keep these results separate from offline code checks.
