# A 20-week learning plan

[Roadmap index](README.md#topic-index) · [Progress checklist](PROGRESS.md)

Plan for roughly 7–10 focused hours each week. This is a pacing suggestion, not a promise of mastery or employment. Spend longer where your checkpoint is weak. API access is optional until you choose to run live model exercises.

Each week: read the guides, run and modify examples, finish one small deliverable, then explain what failed. Use the [topic index](README.md#topic-index) to open every numbered chapter below.

| Week | Chapters | Deliverable | Checkpoint |
| --- | --- | --- | --- |
| 1 | 01–02 | AI feature specification and vector experiments | Explain the model boundary, cosine, probability, and a gradient |
| 2 | 03–04 | Tiny classifier and attention notes | Explain leakage, evaluation split, and query/key/value |
| 3 | 05–07 | Bounded API wrapper and prompt test set | Budget context and distinguish request success from correctness |
| 4 | 08–09 | Ticket classifier design with schema and stream lifecycle | Handle incomplete/refused output and cancellation |
| 5 | 10–11 | Exact vector search with tenant filtering | Explain model compatibility and ANN tradeoffs |
| 6 | 12–13 | Versioned Markdown loader with two chunk strategies | Preserve sources, permissions, and chunk boundaries |
| 7 | 14 | Documentation assistant, offline then optional live | Explain indexing, retrieval, generation, and abstention |
| 8 | 15–16 | Retrieval comparison on labeled questions | Compare baseline, fusion, reranking, and parent expansion |
| 9 | 17–18 | LangChain sequence and read-only tool | Validate arguments and enforce server-owned authorization |
| 10 | 19–20 | Bounded agent and explicit branching graph | Explain when a fixed workflow is better |
| 11 | 21–22 | Isolated session memory and paused review | Explain durable state and replay-safe side effects |
| 12 | 23–25 | MCP glossary integration and context selection | Trace capabilities, data boundaries, and termination |
| 13 | 26–27, 48 | Versioned evaluation set, dataset card, and trace plan | Report retrieval quality without overstating sample evidence |
| 14 | 28–29 | Threat model, adversarial cases, cache identity | Prove denied tools and private evidence stay inaccessible |
| 15 | 30–31 | Local HTTP service and release/rollback plan | Demonstrate validation, isolation, and versioned releases |
| 16 | 32–34 | One modality or local-model experiment | Explain media lifecycle, model features, and hardware limits |
| 17 | 35–36 | Fine-tuning dataset draft and idempotent ingestion design | Choose RAG versus tuning and handle duplicate jobs |
| 18 | 37–40, 45 | Recommendation baseline, experiment plan, NLP comparison | Evaluate usefulness, subgroup limits, and real user outcomes |
| 19 | 41–42, 46–47 | Relationship query, quantization experiment, typed contract | Explain SQL safety, numerical tradeoffs, and runtime validation |
| 20 | 43–44 | Portfolio report and next-specialization plan | Defend architecture and measurements in a five-minute demo |

## Four milestone reviews

**After week 4:** Can you explain tokens, make one bounded request, specify a prompt, validate the returned data shape, and distinguish a refusal from a failure? Show normal, ambiguous, and malformed inputs.

**After week 8:** Can you trace a RAG answer back to source evidence, diagnose a retrieval miss, and compare two retrieval configurations on held-out questions? Show an unsupported query and an unauthorized document case.

**After week 12:** Can you explain the agent loop, route a workflow explicitly, scope memory, pause for review, and prevent a changed action from reusing approval? Show a denied and replayed action.

**After week 20:** Can someone else clone your project, run offline checks, reproduce your small evaluation, understand the architecture, and see honest limitations? Include measured behavior rather than only screenshots.

## Choose a deeper path

- **Application AI engineer:** deepen RAG, tools, backend reliability, evaluation, multimodal UX, and product experiments.
- **ML engineer:** deepen Python, statistics, data pipelines, training, model serving, and experiment tracking.
- **Retrieval specialist:** deepen lexical/dense retrieval, ranking, graph methods, corpus quality, and search evaluation.
- **Inference engineer:** deepen GPU systems, batching, quantization, memory management, and deployment benchmarking.
- **Research path:** deepen math, controlled experiments, paper reproduction, and a chosen model family.

Keep shipping small complete systems as you specialize. Return to foundational chapters whenever a measurement or failure exposes a gap.
