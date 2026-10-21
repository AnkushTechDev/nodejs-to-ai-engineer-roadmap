# 24. Multi-agent systems and orchestration tradeoffs

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Agents and workflows  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [19](../19-agents/README.md), [20](../20-langgraph/README.md)

> Multiple specialized agents can divide work, but coordination is another system you have to debug and evaluate.

## Roles are not automatically intelligence

A researcher, writer, and reviewer can each have a narrow task. A supervisor chooses which worker runs next; a handoff passes control between roles. A shared workspace or message contract lets workers exchange artifacts. These patterns can help when subtasks have different tools, context, or evaluation criteria.

You can also implement the same roles as ordinary functions in a deterministic workflow. Calling three prompts “agents” does not guarantee that the resulting system is better than one prompt with good evidence.

## Define the exchange

Give each worker an input schema, output schema, scope, allowed tools, budget, and termination rule. Exchange compact artifacts with source IDs rather than entire conversation transcripts. Preserve provenance so the writer can cite what the researcher actually found.

Parallel fan-out can reduce wall-clock time for independent work, but it increases concurrent requests and cost. Sequential handoffs can lose context or repeat work. Shared mutable state can create conflicting edits. Handle cancellation and partial failure when one worker fails.

## Reviewers can share mistakes

A second model may repeat the first model’s assumptions. “Another agent approved it” is not independent evidence. Validate claims against sources and use human review for the cases that require it. Compare the multi-agent design against a single-agent baseline on quality, latency, cost, and failure rate.

Use additional roles only when they solve a specific problem. A narrow tool or a clear workflow branch is often enough.

## Read and run the example

[Full JavaScript example](../../examples/24-multi-agent-systems.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 24
```

```javascript
// Sequential roles illustrate orchestration; these are ordinary functions, not LLM agents.
const researcher = question => ({ question, evidence: ['[policy] Annual leave is 20 days.'] });
const writer = state => ({ ...state, draft: 'Employees receive 20 days of annual leave. [policy]' });
const reviewer = state => ({ ...state, passed: state.draft.includes('[policy]') });
const output = reviewer(writer(researcher('How much leave?')));
console.log(output);
console.log('A citation marker check is NOT a factual review. Replace with evidence verification.');
```

The example passes structured artifacts through three ordinary functions. The reviewer checks only a citation marker, intentionally showing how weak a superficial review can be.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Replace the marker check with a check that every cited ID exists in evidence. Then describe why that still cannot establish factual support.

## You are ready to move on when…

Explain one reason to use multiple workers and one coordination failure you must handle.

## Learn from the source

[LangChain multi-agent documentation](https://docs.langchain.com/oss/javascript/langchain/multi-agent). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← MCP: a common interface for tools and resources](../23-model-context-protocol/README.md) · [Reasoning models and context engineering →](../25-reasoning-context-engineering/README.md)
