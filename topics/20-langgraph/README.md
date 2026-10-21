# 20. LangGraph: state, nodes, edges, and routing

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Agents and workflows  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [19](../19-agents/README.md)

> A graph makes branching, retries, and long-running workflow state explicit instead of hiding them in a large prompt.

## Think of a workflow as a state machine

A **state** stores the information your workflow needs. A **node** performs a step and returns updates. An **edge** selects the next step. A **conditional edge** chooses a path based on current state. START and END mark the workflow boundaries.

For a support assistant, nodes might classify a question, retrieve policy, draft a response, and request review. Some nodes can use models; others can be ordinary JavaScript. LangGraph does not require every step to call an LLM.

## State is a contract

Keep raw task data, retrieved IDs, decisions, and execution metadata in state. Build prompts from that data when needed. Avoid storing secrets in checkpoints. Define how concurrent updates combine: replacing a value and accumulating messages are different operations. Reducers control merging when multiple nodes update a shared field.

A graph is compiled before invocation. An invocation supplies input state and execution options. Checkpointing can save progress between steps; durable storage is a separate configuration decision. An in-memory saver is useful for demos but disappears with the process.

## Make branches inspectable

Routing should have a clear meaning and valid destinations. Bound cycles and retries. Keep side effects idempotent because nodes may be retried or replayed. Version workflows with care: resuming an old checkpoint into a changed state schema can fail or behave differently.

The example uses a simple keyword route to isolate graph mechanics. That classifier is intentionally limited: it cannot establish whether the question is truly supported by a policy. Replace it only after defining routing tests.

## Read and run the example

[Full JavaScript example](../../examples/20-langgraph.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 20
```

```javascript
import { StateGraph, START, END, StateSchema } from '@langchain/langgraph';
import { z } from 'zod';
const State = new StateSchema({ question: z.string(), route: z.string().default(''), answer: z.string().default('') });
const graph = new StateGraph(State)
  .addNode('classify', state => ({ route: /leave/i.test(state.question) ? 'policy' : 'fallback' }))
  .addNode('policy', () => ({ answer: 'Demo policy: 20 days of annual leave.' }))
  .addNode('fallback', () => ({ answer: 'I do not have evidence for that question.' }))
  .addEdge(START, 'classify')
  .addConditionalEdges('classify', state => state.route, { policy: 'policy', fallback: 'fallback' })
  .addEdge('policy', END).addEdge('fallback', END).compile();
console.log(await graph.invoke({ question: 'What is our leave policy?' }));
// Deterministic routing teaches graph mechanics without calling an LLM.
```

The graph classifies into `policy` or `fallback`, follows conditional edges, and returns final state. No model is called, so you can run and inspect branching for free.

**Expected behavior:** Final graph state with a policy route and a demo leave answer.

## Try it yourself

Add an expenses node, route to it, and run one question through each path. Draw the resulting graph.

## You are ready to move on when…

Explain which values belong in state and what needs to change before a workflow can survive a process restart.

## Learn from the source

[LangGraph JavaScript Graph API](https://docs.langchain.com/oss/javascript/langgraph/graph-api). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← Agents and the bounded tool loop](../19-agents/README.md) · [Conversation memory and long-term knowledge →](../21-memory/README.md)
