# 21. Conversation memory and long-term knowledge

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Agents and workflows  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [20](../20-langgraph/README.md)

> Memory can make an assistant useful across turns, but unscoped or unbounded memory creates leaks and stale answers.

## Three different things called memory

**Conversation history** contains messages in the current interaction. **Workflow state** tracks progress through a task. **Long-term memory** stores information reused across sessions, such as a user’s preferred answer style. These need different storage, retrieval, and deletion rules.

A model API does not automatically remember every user. Your application decides what to send on each request or which provider conversation state to reference. Sending all past messages forever increases cost and may include stale, irrelevant, or sensitive information.

## Scope it like normal application data

Use authenticated user and tenant IDs to build storage keys. Two users choosing the same visible chat name must not share history. Store creation and expiry times. Let users correct or delete saved preferences. Permission changes must affect what memory is retrievable.

**Sliding windows** keep the latest messages. **Summaries** compress older history but can lose details or introduce errors. **Semantic memory retrieval** searches stored facts, but needs provenance and relevance checks. A guessed fact from a model should not quietly become an authoritative user record.

## Persist deliberately

A JavaScript Map is useful for a lesson, not a durable multi-process store. A production service might use a database for sessions and a configured checkpoint store for workflows. Apply size limits, retention policies, encryption, and access controls appropriate to the data.

Separate a factual source of truth from conversational context. A user saying “our policy is 100 days” does not update the company handbook.

## Read and run the example

[Full JavaScript example](../../examples/21-memory.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 21
```

```javascript
// Each request must derive user/session IDs from authenticated server context.
const sessions = new Map();
function remember(userId, sessionId, message) {
  const key = JSON.stringify([userId, sessionId]);
  const history = [...(sessions.get(key) ?? []), message].slice(-4);
  sessions.set(key, history);
  return history;
}
console.log(remember('alice', 'chat1', 'I prefer concise answers.'));
console.log(remember('bob', 'chat1', 'Explain in detail.'));
console.log(remember('alice', 'chat1', 'What is RAG?'));
// Ephemeral and bounded; no cross-session search or persistence is implemented here.
```

The example keeps a short history under a composite user/session key and shows Alice and Bob remaining separate. It implements neither durable storage nor long-term semantic memory.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Add an expiry field and a deletion function. Demonstrate that deleting one user’s session does not affect another.

## You are ready to move on when…

Explain why history, workflow checkpoints, and long-term preferences should not all share one unbounded array.

## Learn from the source

[LangGraph JavaScript memory](https://docs.langchain.com/oss/javascript/langgraph/add-memory). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← LangGraph: state, nodes, edges, and routing](../20-langgraph/README.md) · [Human approval, interruption, and safe resumption →](../22-human-in-the-loop/README.md)
