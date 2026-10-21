# AI engineering glossary

[Roadmap](README.md) · [Start here](START_HERE.md)

Use this as a quick reference, then open the linked chapter for examples and limitations.

| Term | Plain-language meaning | Chapter |
| --- | --- | --- |
| **A/B test** | A randomized comparison of variants with defined outcomes and guardrails. | [40](topics/40-experimentation/README.md) |
| **Ablation** | Removing a component to measure how much it contributes. | [44](topics/44-python-and-research/README.md) |
| **Abstention** | Declining to answer when evidence or capability is insufficient. | [14](topics/14-rag/README.md) |
| **Agent** | A model-driven loop that can select actions and react to results. | [19](topics/19-agents/README.md) |
| **AI** | Software that performs tasks associated with intelligence. | [01](topics/01-ai-engineering/README.md) |
| **AI engineer** | An engineer who builds and measures systems using models and data. | [01](topics/01-ai-engineering/README.md) |
| **ANN** | Approximate nearest-neighbor search, trading some recall for speed. | [11](topics/11-vector-databases/README.md) |
| **ASR/STT** | Automatic speech recognition / speech-to-text. | [33](topics/33-voice-and-realtime/README.md) |
| **Attention** | Combining information using relevance weights between representations. | [04](topics/04-neural-networks-transformers/README.md) |
| **Backpressure** | Controlling a producer when a consumer cannot keep up. | [09](topics/09-streaming/README.md) |
| **Backpropagation** | Computing gradients through a neural network using the chain rule. | [04](topics/04-neural-networks-transformers/README.md) |
| **Barge-in** | A user interrupting assistant audio, requiring cancellation and playback control. | [33](topics/33-voice-and-realtime/README.md) |
| **Baseline** | A simple reference system that a more complex approach should beat. | [03](topics/03-machine-learning/README.md) |
| **BM25** | A lexical ranking method using term frequency, corpus rarity, and document length. | [15](topics/15-hybrid-search-reranking/README.md) |
| **Canary** | A limited rollout used to observe a release before wider exposure. | [31](topics/31-deployment-llmops/README.md) |
| **Causal mask** | A restriction preventing a token position from attending to future tokens. | [04](topics/04-neural-networks-transformers/README.md) |
| **Checkpoint** | A saved workflow state used for recovery or resumption. | [20](topics/20-langgraph/README.md) |
| **Chunk** | A retrievable piece of a source document. | [13](topics/13-chunking/README.md) |
| **Circuit breaker** | Temporarily stopping calls to an unhealthy dependency. | [29](topics/29-cost-latency-caching/README.md) |
| **Classification** | Predicting a category, such as billing or technical support. | [03](topics/03-machine-learning/README.md) |
| **Clustering** | Grouping examples by similarity without target class labels. | [37](topics/37-search-recommendations/README.md) |
| **Cold start** | Little or no interaction history for a new user or item. | [37](topics/37-search-recommendations/README.md) |
| **Collaborative filtering** | Recommendations learned from patterns of user-item interactions. | [37](topics/37-search-recommendations/README.md) |
| **Confusion matrix** | A table showing predicted versus actual categories. | [03](topics/03-machine-learning/README.md) |
| **Context engineering** | Selecting and organizing information supplied to a model. | [25](topics/25-reasoning-context-engineering/README.md) |
| **Context window** | The model’s available working space for request and generation tokens. | [05](topics/05-tokens-and-context/README.md) |
| **Continuous batching** | Dynamically scheduling active generation requests into inference batches. | [42](topics/42-model-optimization/README.md) |
| **Cosine similarity** | A comparison of vector direction; not factual confidence. | [10](topics/10-embeddings/README.md) |
| **Cross-encoder** | A model that jointly reads query and candidate to score their relationship. | [15](topics/15-hybrid-search-reranking/README.md) |
| **Data leakage** | Information from evaluation or the future improperly influencing training or selection. | [48](topics/48-datasets-and-labeling/README.md) |
| **Dataset card** | Documentation of a dataset’s origin, intended use, limitations, and terms. | [48](topics/48-datasets-and-labeling/README.md) |
| **Dead-letter queue** | A place to inspect jobs that repeatedly failed processing. | [36](topics/36-data-pipelines/README.md) |
| **Deep learning** | Machine learning using neural networks with multiple layers. | [04](topics/04-neural-networks-transformers/README.md) |
| **Dense retrieval** | Search using learned vector representations. | [10](topics/10-embeddings/README.md) |
| **Diffusion** | A family of generative methods learning to reverse a noise process. | [46](topics/46-image-generation-diffusion/README.md) |
| **Discriminated union** | A type with distinct variants identified by a shared tag field. | [47](topics/47-typescript-and-js-ecosystem/README.md) |
| **Distillation** | Training a student model to reproduce useful teacher behavior. | [42](topics/42-model-optimization/README.md) |
| **Dot product** | The sum of products of matching vector coordinates. | [02](topics/02-math-for-ai/README.md) |
| **DPO** | Direct preference optimization; a training method using preference comparisons. | [35](topics/35-fine-tuning/README.md) |
| **Edge** | A connection selecting the next workflow step. | [20](topics/20-langgraph/README.md) |
| **Embedding** | A learned numerical representation used for comparisons and downstream tasks. | [10](topics/10-embeddings/README.md) |
| **Evaluation** | Measuring behavior against representative tasks and expectations. | [26](topics/26-evaluation/README.md) |
| **F1** | The harmonic mean of precision and recall. | [03](topics/03-machine-learning/README.md) |
| **Feature** | An input measurement or representation used by a model. | [03](topics/03-machine-learning/README.md) |
| **Few-shot** | Instructions that include a few examples of desired behavior. | [07](topics/07-prompt-engineering/README.md) |
| **Fine-tuning** | Updating a pretrained model using task or behavior examples. | [35](topics/35-fine-tuning/README.md) |
| **Generative AI** | Models that create outputs such as text, images, or audio. | [01](topics/01-ai-engineering/README.md) |
| **Gradient** | How a function changes as its inputs or parameters change. | [02](topics/02-math-for-ai/README.md) |
| **GraphRAG** | A family of retrieval methods using graph structure to assemble context. | [41](topics/41-graph-rag-and-text-to-sql/README.md) |
| **Grounding** | Basing an answer on supplied or otherwise verified evidence. | [14](topics/14-rag/README.md) |
| **Hallucination** | Generated content that is unsupported or incorrect in its context. | [14](topics/14-rag/README.md) |
| **HNSW** | A graph-based approximate nearest-neighbor indexing method. | [11](topics/11-vector-databases/README.md) |
| **Human-in-the-loop** | A workflow that includes a person for review or decisions. | [22](topics/22-human-in-the-loop/README.md) |
| **Hybrid search** | Combining lexical and dense retrieval signals. | [15](topics/15-hybrid-search-reranking/README.md) |
| **HyDE** | Searching with a generated hypothetical answer; the hypothetical text is not evidence. | [16](topics/16-advanced-rag/README.md) |
| **Hyperparameter** | A setting chosen around training or inference, such as learning rate. | [03](topics/03-machine-learning/README.md) |
| **Idempotency** | Making repeated execution of the same operation avoid duplicate effects. | [22](topics/22-human-in-the-loop/README.md) |
| **Inference** | Using a trained model to produce a result for a new input. | [03](topics/03-machine-learning/README.md) |
| **Inpainting** | Editing or generating selected image regions, often using a mask. | [46](topics/46-image-generation-diffusion/README.md) |
| **IVFFlat** | An approximate index that groups vectors and searches selected groups. | [11](topics/11-vector-databases/README.md) |
| **JSON Schema** | A language for describing JSON data structures and constraints. | [08](topics/08-structured-outputs/README.md) |
| **JSON-RPC** | A JSON-based remote procedure call message format used by MCP. | [23](topics/23-model-context-protocol/README.md) |
| **KV cache** | Stored attention keys and values used to avoid recomputing previous tokens. | [42](topics/42-model-optimization/README.md) |
| **Label** | The target answer attached to a training or evaluation example. | [03](topics/03-machine-learning/README.md) |
| **LangChain** | Interfaces and integrations for composing model-powered applications. | [17](topics/17-langchain/README.md) |
| **LangGraph** | A framework/runtime for explicit stateful graph workflows. | [20](topics/20-langgraph/README.md) |
| **Latent space** | A learned representation space used instead of raw input coordinates. | [46](topics/46-image-generation-diffusion/README.md) |
| **LCEL** | LangChain Expression Language; composition patterns for runnables. | [17](topics/17-langchain/README.md) |
| **Learning rate** | The size of a parameter update during optimization. | [02](topics/02-math-for-ai/README.md) |
| **Lexical retrieval** | Search based on terms rather than learned semantic closeness. | [15](topics/15-hybrid-search-reranking/README.md) |
| **LLM** | Large language model; a model trained on language-related data to generate and process language. | [04](topics/04-neural-networks-transformers/README.md) |
| **LLM-as-judge** | Using a model to score outputs under a rubric, with its own biases and error. | [26](topics/26-evaluation/README.md) |
| **LLMOps** | Operational practices for evaluating, deploying, and maintaining LLM applications. | [31](topics/31-deployment-llmops/README.md) |
| **Logit** | An unnormalized model score before a probability transformation. | [02](topics/02-math-for-ai/README.md) |
| **Long-term memory** | Information persisted for reuse across sessions. | [21](topics/21-memory/README.md) |
| **LoRA** | Low-rank adaptation; training small parameter additions to a base model. | [35](topics/35-fine-tuning/README.md) |
| **Loss** | A numerical penalty that measures prediction error for training. | [02](topics/02-math-for-ai/README.md) |
| **Machine learning** | Learning patterns from examples instead of writing every rule by hand. | [03](topics/03-machine-learning/README.md) |
| **Matrix** | A two-dimensional table of numbers. | [02](topics/02-math-for-ai/README.md) |
| **MCP** | Model Context Protocol; a shared interface for tool and data capabilities. | [23](topics/23-model-context-protocol/README.md) |
| **Metadata** | Information about a record, such as source, tenant, date, or version. | [12](topics/12-document-ingestion/README.md) |
| **Model card** | Documentation of a model’s intended use, evaluation, and limitations. | [39](topics/39-responsible-ai/README.md) |
| **MRR** | Mean reciprocal rank; rewards early appearance of the first relevant result. | [26](topics/26-evaluation/README.md) |
| **Multi-agent system** | An orchestrated system with multiple model-driven workers or roles. | [24](topics/24-multi-agent-systems/README.md) |
| **Multi-hop retrieval** | Gathering connected evidence through several retrieval steps. | [16](topics/16-advanced-rag/README.md) |
| **Multimodal** | Handling multiple input/output types such as text, images, or audio. | [32](topics/32-multimodal-ai/README.md) |
| **N-gram** | A sequence of n words, characters, or other tokens. | [45](topics/45-nlp-fundamentals/README.md) |
| **nDCG** | A ranking metric considering graded relevance and position. | [26](topics/26-evaluation/README.md) |
| **NER** | Named entity recognition; identifying labeled spans in text. | [45](topics/45-nlp-fundamentals/README.md) |
| **NLP** | Natural language processing; computational tasks involving human language. | [45](topics/45-nlp-fundamentals/README.md) |
| **Node** | A workflow step that reads state and returns updates. | [20](topics/20-langgraph/README.md) |
| **OCR** | Optical character recognition; extracting text from images. | [32](topics/32-multimodal-ai/README.md) |
| **Open weights** | Published model parameters under stated licensing terms. | [34](topics/34-local-open-models/README.md) |
| **Outbox pattern** | Recording a data change and its publishable event together for reliable delivery. | [36](topics/36-data-pipelines/README.md) |
| **Overfitting** | Learning training-set details that do not transfer to new examples. | [03](topics/03-machine-learning/README.md) |
| **Overlap** | Text repeated between adjacent chunks to preserve boundary context. | [13](topics/13-chunking/README.md) |
| **p95** | A percentile: 95% of measured values are at or below this value. | [27](topics/27-observability/README.md) |
| **Parameter** | A numerical value learned during training, such as a neural-network weight. | [04](topics/04-neural-networks-transformers/README.md) |
| **Parent-child retrieval** | Search small chunks, then return their larger parent context. | [16](topics/16-advanced-rag/README.md) |
| **pgvector** | A PostgreSQL extension for vector storage and similarity queries. | [11](topics/11-vector-databases/README.md) |
| **PII** | Personally identifiable information; classification depends on context and policy. | [28](topics/28-security/README.md) |
| **Precision** | Of the items predicted positive, the fraction that are actually positive. | [03](topics/03-machine-learning/README.md) |
| **Pretraining** | Initial broad training before task-specific adaptation. | [04](topics/04-neural-networks-transformers/README.md) |
| **Prompt** | The instructions and context supplied for a model task. | [07](topics/07-prompt-engineering/README.md) |
| **Prompt injection** | Malicious instructions embedded in user input or retrieved data. | [28](topics/28-security/README.md) |
| **Provenance** | Where information came from and how it was produced. | [12](topics/12-document-ingestion/README.md) |
| **QLoRA** | Adapter tuning with a quantized base model. | [35](topics/35-fine-tuning/README.md) |
| **Quantization** | Representing numerical values with fewer bits, introducing tradeoffs. | [42](topics/42-model-optimization/README.md) |
| **Query/key/value** | Representations used to calculate attention weights and combine information. | [04](topics/04-neural-networks-transformers/README.md) |
| **RAG** | Retrieval-augmented generation: provide retrieved evidence to a generator. | [14](topics/14-rag/README.md) |
| **Rate limit** | A bound on request frequency or usage. | [29](topics/29-cost-latency-caching/README.md) |
| **ReAct** | A pattern interleaving task reasoning, actions, and observations. | [19](topics/19-agents/README.md) |
| **Recall** | Of the truly positive items, the fraction found. | [03](topics/03-machine-learning/README.md) |
| **Recall@k** | The fraction of relevant items retrieved within the first k results. | [26](topics/26-evaluation/README.md) |
| **Reducer** | A rule for combining updates to a state field. | [20](topics/20-langgraph/README.md) |
| **Refusal** | A model declining to provide the requested output. | [08](topics/08-structured-outputs/README.md) |
| **Regression** | Predicting a numerical value. | [03](topics/03-machine-learning/README.md) |
| **Reinforcement learning** | Learning behavior using rewards from interactions. | [03](topics/03-machine-learning/README.md) |
| **Reranker** | A second-stage system that reorders retrieved candidates. | [15](topics/15-hybrid-search-reranking/README.md) |
| **RRF** | Reciprocal rank fusion; combining rankings using rank positions. | [15](topics/15-hybrid-search-reranking/README.md) |
| **Runnable** | An invocable, composable component in LangChain. | [17](topics/17-langchain/README.md) |
| **Semantic cache** | Reusing an answer for a similar request; similarity can hide important differences. | [29](topics/29-cost-latency-caching/README.md) |
| **SFT** | Supervised fine-tuning using desired input-output examples. | [35](topics/35-fine-tuning/README.md) |
| **Short-term memory** | Context retained for a current conversation or task. | [21](topics/21-memory/README.md) |
| **Softmax** | A transformation from scores into nonnegative values summing to one. | [02](topics/02-math-for-ai/README.md) |
| **Span** | A timed unit of work within a trace. | [27](topics/27-observability/README.md) |
| **Speculative decoding** | Proposing candidate tokens and verifying them with a target model. | [42](topics/42-model-optimization/README.md) |
| **SSE** | Server-Sent Events; a one-way server-to-client event stream over HTTP. | [09](topics/09-streaming/README.md) |
| **SSRF** | Abusing server-side URL fetching to access unintended network destinations. | [28](topics/28-security/README.md) |
| **Stdio** | Standard input/output; one transport for local protocol communication. | [23](topics/23-model-context-protocol/README.md) |
| **Streaming** | Receiving incremental events before the full response is complete. | [09](topics/09-streaming/README.md) |
| **Structured output** | A response constrained to a defined data shape. | [08](topics/08-structured-outputs/README.md) |
| **Supervised learning** | Learning from inputs paired with target outputs. | [03](topics/03-machine-learning/README.md) |
| **Temperature** | A supported sampling setting affecting randomness. | [05](topics/05-tokens-and-context/README.md) |
| **Tenant isolation** | Keeping one customer’s data inaccessible to another. | [28](topics/28-security/README.md) |
| **Tensor** | An array with one or more dimensions, used for numerical computation. | [44](topics/44-python-and-research/README.md) |
| **Text-to-SQL** | Translating a language request into a structured database query proposal. | [41](topics/41-graph-rag-and-text-to-sql/README.md) |
| **TF-IDF** | Term weighting based on frequency in a document and rarity across documents. | [45](topics/45-nlp-fundamentals/README.md) |
| **Token** | A model-specific piece of encoded input or output. | [05](topics/05-tokens-and-context/README.md) |
| **Tokenizer** | The algorithm that converts text into model token IDs. | [05](topics/05-tokens-and-context/README.md) |
| **Tool call** | A structured model request for an application-owned handler to run. | [18](topics/18-tool-calling/README.md) |
| **Top-p** | A sampling restriction based on cumulative probability mass. | [05](topics/05-tokens-and-context/README.md) |
| **Trace** | A connected record of the steps in one request. | [27](topics/27-observability/README.md) |
| **Train/validation/test split** | Separate data for fitting, choosing settings, and final evaluation. | [03](topics/03-machine-learning/README.md) |
| **Training** | Adjusting model parameters to improve an objective on examples. | [03](topics/03-machine-learning/README.md) |
| **Transformer** | A neural architecture built around attention and other layers. | [04](topics/04-neural-networks-transformers/README.md) |
| **TTS** | Text-to-speech; generating spoken audio from text. | [33](topics/33-voice-and-realtime/README.md) |
| **Underfitting** | Failing to capture useful patterns in the data. | [03](topics/03-machine-learning/README.md) |
| **Unsupervised learning** | Learning structure without target labels. | [03](topics/03-machine-learning/README.md) |
| **VAD** | Voice activity detection; detecting speech regions in audio. | [33](topics/33-voice-and-realtime/README.md) |
| **Vector** | An ordered list of numbers. | [02](topics/02-math-for-ai/README.md) |
| **Vector database** | Storage and query infrastructure for vectors and metadata. | [11](topics/11-vector-databases/README.md) |
| **Zero-shot** | Instructions without task examples. | [07](topics/07-prompt-engineering/README.md) |
| **Zod** | A JavaScript/TypeScript library for runtime schema definition and validation. | [08](topics/08-structured-outputs/README.md) |
