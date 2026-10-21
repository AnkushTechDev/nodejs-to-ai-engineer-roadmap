# 08. Structured outputs and schema validation

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** LLM applications  
**Run mode:** API: credentials and a compatible model are required; calls may cost money.  
**Before this chapter:** [06](../06-model-apis/README.md), [07](../07-prompt-engineering/README.md)

> Your backend needs predictable data types, not a paragraph that happens to look like JSON.

## Make the shape explicit

Suppose a model routes support tickets. Your service needs `{ category, summary }`, where category is one of three allowed values. Valid JSON alone is not enough: `{ "category": 42 }` parses successfully but breaks the application contract.

A **JSON Schema** describes a data structure. **Zod** defines and validates data structures in JavaScript or TypeScript. A provider’s structured-output feature can constrain generation to a supported schema. Runtime validation remains useful at your boundary and when data is read later.

## Shape is different from truth

A result can match the schema and still choose the wrong category. A refund amount can be a valid number and still violate policy. Validate syntax and types first; then validate business rules and factual support. Treat generated strings as untrusted when rendering HTML or passing them to another interpreter.

## Handle the other outcomes

A model may refuse, run out of output capacity, or fail before producing a complete parsed object. Do not immediately call `JSON.parse` on arbitrary output or quietly fill missing fields with invented defaults. Define whether the request should be retried, shown for review, or rejected.

Keep schemas small and explicit. Use enums for closed choices. Distinguish a missing fact from a genuine zero or empty string. Providers support particular schema subsets, so test the chosen schema with the chosen model. Schema migrations matter when saved outputs are consumed by older workers.

## Read and run the example

[Full JavaScript example](../../examples/08-structured-outputs.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 08
```

```javascript
import { z } from 'zod';
import { zodTextFormat } from 'openai/helpers/zod';
import { getClient, getModel } from './lib/provider.mjs';
const Ticket = z.object({ category: z.enum(['billing', 'technical', 'other']), summary: z.string() });
const response = await getClient().responses.parse({
  model: getModel(), store: false, max_output_tokens: 512,
  input: 'Classify this ticket: I was charged twice for my subscription.',
  text: { format: zodTextFormat(Ticket, 'ticket') },
});
if (response.status !== 'completed' || !response.output_parsed) throw Error('Incomplete response or refusal; no valid ticket');
console.log(Ticket.parse(response.output_parsed));
```

The example defines a Zod ticket schema, passes its format to the Responses parsing API, checks completion and parsed output, then validates before printing. There is no automatic action based on the label.

**Expected behavior:** A validated ticket object, or an explicit failure if the provider refuses or cannot complete.

## Try it yourself

Add a priority enum and create examples where urgency is ambiguous. Decide how a human can review uncertain routing.

## You are ready to move on when…

Explain why schema conformance cannot establish classification accuracy.

## Learn from the source

[Official OpenAI structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← Prompt engineering without magic](../07-prompt-engineering/README.md) · [Streaming and a responsive user experience →](../09-streaming/README.md)
