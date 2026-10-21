# Official resources and source notes

[Roadmap](README.md) · [Verification](VERIFICATION.md)

The chapter explanations and exercises are written for this repository. The links below are primary documentation or original research for deeper study. APIs and capabilities evolve; use documentation matching your installed packages and chosen models.

## Foundations

- [Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course): structured ML foundations and exercises.
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762): original transformer paper; read after the attention exercise.
- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401): original RAG research.
- [Stanford Introduction to Information Retrieval](https://nlp.stanford.edu/IR-book/): lexical search, indexing, and retrieval evaluation.
- [PyTorch beginner guide](https://pytorch.org/tutorials/beginner/basics/intro.html): tensors, differentiation, and training.

## Model APIs

- [Official OpenAI quickstart](https://developers.openai.com/api/docs/quickstart).
- [Responses API reference](https://developers.openai.com/api/reference/typescript/resources/responses/methods/create).
- [Structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs).
- [Function calling](https://developers.openai.com/api/docs/guides/function-calling).
- [Embeddings reference](https://developers.openai.com/api/reference/typescript/resources/embeddings/methods/create).
- [Streaming](https://developers.openai.com/api/docs/guides/streaming-responses).
- [Vision inputs](https://developers.openai.com/api/docs/guides/images-vision).
- [Audio](https://developers.openai.com/api/docs/guides/audio).

The repository chooses no default chat model. Select an available model that supports the example’s capability. Check current account access and prices in official provider sources rather than relying on a fixed price table in this repo.

## Frameworks, retrieval, and protocols

- [LangChain JavaScript overview](https://docs.langchain.com/oss/javascript/langchain/overview) and [quickstart](https://docs.langchain.com/oss/javascript/langchain/quickstart).
- [LangChain agents](https://docs.langchain.com/oss/javascript/langchain/agents).
- [LangGraph Graph API](https://docs.langchain.com/oss/javascript/langgraph/graph-api), [memory](https://docs.langchain.com/oss/javascript/langgraph/add-memory), and [interrupts](https://docs.langchain.com/oss/javascript/langgraph/interrupts).
- [pgvector](https://github.com/pgvector/pgvector): dimensions, distance operators, indexing, filtering, and hybrid search.
- [MCP server guide](https://modelcontextprotocol.io/docs/develop/build-server) and [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk).
- [Microsoft GraphRAG](https://microsoft.github.io/graphrag/): graph-based retrieval methods.
- [Ollama chat API](https://docs.ollama.com/api/chat): local chat endpoint.

## Production and deeper study

- [Node.js 22 test runner](https://nodejs.org/docs/latest-v22.x/api/test.html) and [HTTP](https://nodejs.org/docs/latest-v22.x/api/http.html).
- [OpenTelemetry JavaScript](https://opentelemetry.io/docs/languages/js/).
- [OWASP GenAI security project](https://genai.owasp.org/).
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework).
- [BullMQ idempotent jobs](https://docs.bullmq.io/patterns/idempotent-jobs).
- [Hugging Face PEFT LoRA](https://huggingface.co/docs/peft/main/en/conceptual_guides/lora), [quantization](https://huggingface.co/docs/transformers/quantization/overview), and [Diffusers](https://huggingface.co/docs/diffusers/index).
- [Hugging Face dataset cards](https://huggingface.co/docs/hub/datasets-cards).
- [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/intro.html).

## API review notes

On **21 October 2026**, selected OpenAI Responses/structured-output/function-calling/embedding references, LangChain JavaScript and LangGraph graph references, MCP server guidance, pgvector documentation, and Ollama chat documentation were consulted while creating the examples. The lockfile records the exact installed dependency versions. This is not a claim that every external link, every provider capability, or every live-model output was tested.

The installed MCP server example uses the `@modelcontextprotocol/sdk` 1.x import layout. Protocol documentation may discuss newer SDK layouts; follow the documentation for your installed major version. The MCP round-trip test verifies this repository’s actual installed API.

If an API changes, open an issue with the chapter, package version, sanitized error, and official documentation link. Never include credentials or private documents.
