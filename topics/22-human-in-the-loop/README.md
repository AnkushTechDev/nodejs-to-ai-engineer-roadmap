# 22. Human approval, interruption, and safe resumption

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Agents and workflows  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [20](../20-langgraph/README.md), [21](../21-memory/README.md)

> An assistant may prepare a sensitive action while a person retains the final decision.

## Pause before the consequence

Suppose an assistant recommends a refund. It can gather evidence and prepare the amount, but a reviewer should see the exact action before money moves. A useful review includes the target, amount, reason, supporting evidence, and consequences. “Approve the agent” is too vague.

In LangGraph, an interrupt can pause execution and return a review payload. A checkpointer preserves state so a later command can resume the workflow. The resume must use the correct thread identity. Authentication and authorization of the reviewer belong in your application.

## Approval is specific

Bind approval to the exact action payload, policy version, and expiry. If the amount changes, the old approval should not apply. Record who approved and when. Do not let a model or an arbitrary request body claim that approval happened.

Nodes may restart when resumed. Put irreversible work after the approval boundary and protect it with a stable idempotency key. A checkpoint is not a transaction with an external payment system. Plan for a crash after the payment succeeds but before the workflow records success.

## The demo has deliberate limits

The example resumes with a hardcoded `true` to simulate a reviewer. It records a demo intent and never moves money. MemorySaver exists only within the process. A real service needs durable checkpoint storage, an authenticated review interface, denial handling, expiry, and replay-safe execution.

Human review should be usable: show concise evidence and precise options, and provide a route for escalation instead of overwhelming people with every low-risk lookup.

## Read and run the example

[Full JavaScript example](../../examples/22-human-in-the-loop.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 22
```

```javascript
import { StateGraph, StateSchema, START, END, MemorySaver, interrupt, Command } from '@langchain/langgraph';
import { z } from 'zod';
const State = new StateSchema({ approved: z.boolean().default(false), result: z.string().default('') });
const graph = new StateGraph(State)
  .addNode('review', () => ({ approved: interrupt({ action: 'Prepare a demo refund', amount: 25 }) === true }))
  .addNode('decide', state => ({ result: state.approved ? 'Approved demo intent recorded; no money moved.' : 'Denied.' }))
  .addEdge(START, 'review').addEdge('review', 'decide').addEdge('decide', END)
  .compile({ checkpointer: new MemorySaver() });
const config = { configurable: { thread_id: 'demo-review-1' } };
console.log('Paused:', await graph.invoke({}, config));
console.log('Resumed:', await graph.invoke(new Command({ resume: true }), config));
// Hardcoded true SIMULATES an authenticated reviewer. MemorySaver lasts only in this process.
```

The graph pauses in a review node, prints the interrupt state, and resumes with Command. You can switch the simulated approval to false and observe denial.

**Expected behavior:** A paused review payload followed by a resumed demo result. No payment occurs.

## Try it yourself

Change the payload after approval in a separate toy function and reject it using a stored payload hash.

## You are ready to move on when…

Explain why code before an interrupt must be safe to replay and why approval must match the action.

## Learn from the source

[LangGraph JavaScript interrupts](https://docs.langchain.com/oss/javascript/langgraph/interrupts). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← Conversation memory and long-term knowledge](../21-memory/README.md) · [MCP: a common interface for tools and resources →](../23-model-context-protocol/README.md)
