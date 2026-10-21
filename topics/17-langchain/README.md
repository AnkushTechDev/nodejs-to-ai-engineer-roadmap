# 17. LangChain for JavaScript developers

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Agents and workflows  
**Run mode:** API: credentials and a compatible model are required; calls may cost money.  
**Before this chapter:** [06](../06-model-apis/README.md), [07](../07-prompt-engineering/README.md), [08](../08-structured-outputs/README.md)

> LangChain supplies reusable model, prompt, tool, and retrieval interfaces. It is easier to use well after understanding the steps it connects.

## A library around familiar building blocks

You can call a model directly with its SDK. As the application grows, you may repeatedly assemble prompts, invoke models, parse responses, and connect tools. LangChain provides abstractions for these operations and integrations with many services.

For a simple sequence, think of middleware composition: input enters one component and its output enters the next. A **prompt template** fills variables into messages. A **chat model** produces a model message. An **output parser** converts that message into the form your next step expects.

## Learn the pieces separately

A runnable can be invoked and composed with other runnables. In this example, `.pipe()` connects prompt → model → string parser. Structured parsers, retrievers, document loaders, and tool definitions solve related but separate problems. A parser turning a response into text does not validate its facts.

For standard tool-using agents, the current JavaScript API includes `createAgent`. LangGraph supplies lower-level workflow orchestration. LangSmith is a separate observability/evaluation product; you do not need an account for the local examples in this repository.

## Frameworks do not remove responsibility

You still own input validation, authentication, evidence permissions, tool authorization, retries, and evaluation. Read the installed package’s documentation when copying examples: JavaScript and Python APIs differ, and older tutorials may target previous major versions.

Start by building one direct SDK call, then the equivalent LangChain sequence. Add the abstraction when its integration or composition helps. Keep business rules in clear application functions so they remain understandable and testable outside the framework.

## Read and run the example

[Full JavaScript example](../../examples/17-langchain.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 17
```

```javascript
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatOpenAI } from '@langchain/openai';
import { getModel } from './lib/provider.mjs';
const prompt = ChatPromptTemplate.fromMessages([
  ['system', 'Explain AI concepts to a Node.js developer in two sentences.'],
  ['human', '{topic}'],
]);
const model = new ChatOpenAI({ model: getModel(), maxRetries: 2, timeout: 30000 });
const chain = prompt.pipe(model).pipe(new StringOutputParser());
console.log(await chain.invoke({ topic: 'vector search' }));
```

The script formats messages using a prompt template, invokes ChatOpenAI, and turns the returned message into a string. It makes one paid model call and does not use tools.

**Expected behavior:** A short model-generated explanation of vector search; wording varies.

## Try it yourself

Add a second prompt variable for the audience, then compare a direct SDK implementation with the composed chain.

## You are ready to move on when…

Explain what each of the three components accepts and returns, and when you would skip the framework.

## Learn from the source

[LangChain JavaScript overview](https://docs.langchain.com/oss/javascript/langchain/overview). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← Advanced RAG patterns and when to use them](../16-advanced-rag/README.md) · [Tool calling: let models request code safely →](../18-tool-calling/README.md)
