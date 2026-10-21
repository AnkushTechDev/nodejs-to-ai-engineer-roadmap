# Start here

[Roadmap](README.md) · [Study plan](STUDY_PLAN.md) · [All commands](#commands)

## 1. Bring the skills you already have

You should know functions, arrays, objects, modules, async/await, and basic HTTP. If these are new, first build a small Node.js JSON API. This repository uses JavaScript ES modules (`.mjs`) so you can run examples without a transpiler. Chapter 47 adds TypeScript concepts and an optional `.ts` reading companion.

Use Node.js **22.14 or newer** and npm. Node 22 is the baseline in `.nvmrc`. If you use nvm, run `nvm install` and `nvm use` from the repository root. Windows users can install a compatible Node release using their preferred installer or version manager.

```bash
node --version
npm --version
npm ci
npm run check
npm test
```

Run every command from the root directory containing `package.json`. `npm ci` uses the committed lockfile. The install needs internet access; offline examples need no network once dependencies are installed.

## 2. Start without a key

```bash
npm run learn -- --list
npm run learn -- 01
npm run learn -- 02
npm run learn -- 10
npm run demo
```

Read the matching topic README before and after running the script. Change one input, predict the output, then explain the result. Tiny examples isolate one concept; they are not complete products or performance benchmarks.

## 3. Configure a provider only when needed

The API chapters use the OpenAI SDK as one concrete provider example. Other providers are possible, but API formats and supported features differ.

```bash
# macOS/Linux
cp .env.example .env
```

```powershell
# Windows PowerShell
Copy-Item .env.example .env
```

Edit `.env` in your editor:

```dotenv
OPENAI_API_KEY=your-own-key
OPENAI_MODEL=an-exact-model-id-available-to-your-account
OPENAI_EMBEDDING_MODEL=text-embedding-3-small
```

The model value above is a descriptive placeholder, not a real model ID. Choose one from your provider account that supports the chapter’s capability. Structured output, vision, and tool calling may require particular models. There is no hardcoded chat-model fallback and no promise that calls are free. Start with tiny requests and an account spending limit. Keep `.env` out of commits; `.gitignore` already excludes it.

```bash
npm run learn -- 06
npm run learn -- 08
npm run learn -- 10 --live
npm run demo -- --live "How much annual leave do employees receive?"
```

No credentials are needed to read these scripts. This repository does not require you to provide a key to an assistant or paste one into chat.

## Execution modes

| Mode | What you need | Examples |
| --- | --- | --- |
| `offline` | Installed dependencies; no credentials | 01–05, 07, 10–16, 20–22, 24–31, 33, 35–48 except the API/local entries shown in the index |
| `api` | Provider key and supported model; may cost money | 06, 08, 09, 17, 18, 19, 32 |
| `local` | Ollama running at localhost:11434 and downloaded weights | 34 |
| `service` | A compatible MCP client | 23 |

Chapter 10 and the documentation assistant default to offline; `--live` opts into network calls. Chapter 32 needs a local PNG path. Chapter 23 runs until the client disconnects or you press Ctrl+C. Neither long-running services nor API/local-model chapters are included in `--offline`.

## Commands

```bash
npm run learn -- 14                  # One numbered chapter
npm run learn -- 14-rag              # Or its full slug
npm run learn -- --offline           # All offline chapters, sequentially
npm run check                       # Syntax, local docs links/anchors, coverage
npm test                            # Deterministic unit and integration tests
npm run demo -- "remote work policy" # Offline excerpts
npm run workflow                    # Prepared demo action
npm run workflow -- --approve-demo   # Simulated approval and replay check
npm run serve                       # Local excerpt API on port 3000
python3 examples/python-bridge.py    # Optional standard-library Python example
```

The [pgvector SQL fixture](examples/pgvector.sql) requires a separate throwaway PostgreSQL database with pgvector installed. It uses three synthetic dimensions and is not a schema for real embeddings.

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| Unknown `--env-file-if-exists` option | Upgrade Node to the declared minimum |
| Module/package not found | Run `npm ci` in the repository root |
| API key missing | Edit `.env`; run through the npm commands that load it |
| Model not found or unsupported parameter | Verify the exact model ID and capability in official provider docs |
| Rate limit or insufficient balance | Inspect your provider account; reduce concurrency and use offline lessons meanwhile |
| Ollama connection refused | Start Ollama, download a permitted model, and set `OLLAMA_MODEL` |
| MCP script appears to wait | It is a server waiting for a protocol client, not a chatbot CLI |
| RAG returns the wrong passage | Inspect retrieval and labeling before changing the generation prompt |
| Port 3000 is in use | Set `PORT` to a free port or stop the conflicting local process |
| `listen EPERM` in tests | Your environment blocks local sockets; rerun tests in an environment allowing loopback |

Use [the glossary](GLOSSARY.md) when a term is unfamiliar. Keep a short learning log in [PROGRESS.md](PROGRESS.md).
