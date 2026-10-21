# 18. Tool calling: let models request code safely

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Agents and workflows  
**Run mode:** API: credentials and a compatible model are required; calls may cost money.  
**Before this chapter:** [08](../08-structured-outputs/README.md), [06](../06-model-apis/README.md)

> A model cannot know your live order status unless your application gives it access to a trusted lookup.

## A tool call is a request, not an action

Describe a tool using a name, purpose, and argument schema. The model may return a structured request such as `lookup_order({ orderId: "demo-order" })`. Your application validates and authorizes that request, runs ordinary code, then sends the result back to the model.

This resembles dispatching an API route. The model proposes arguments; it does not gain authority to execute arbitrary JavaScript. Never use `eval`, arbitrary shell execution, or unrestricted SQL as a shortcut.

## Follow the complete round trip

Send tool definitions with the question. Inspect returned items for function calls. Check the tool name against an allowlist, parse its JSON arguments, validate the schema, and verify access using authenticated server context. Execute only the approved handler. Return the result linked to the original call ID, then ask the model to produce the answer.

Preserve the response items required by the provider’s conversation contract, including reasoning items when present. Do not keep only the visible text and discard tool call context. Multiple tool calls may appear; handle all supported calls or reject explicitly.

## Read tools and write tools differ

Reading an order is lower risk than issuing a refund. A write tool needs explicit authorization, idempotency, audit records, and possibly human approval. A retry after a timeout must not charge twice. Use a stable operation ID and server-owned business rules.

Keep the tool description narrow and the result small. Tool output is also untrusted model input, especially if it includes external page content. A successful lookup does not authorize an unrelated action.

## Read and run the example

[Full JavaScript example](../../examples/18-tool-calling.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 18
```

```javascript
import { z } from 'zod';
import { getClient, getModel } from './lib/provider.mjs';
const argsSchema = z.object({ orderId: z.enum(['demo-order']) }).strict();
const tools = [{ type: 'function', name: 'lookup_order', description: 'Read the status of the demo order.',
  strict: true, parameters: { type: 'object', properties: { orderId: { type: 'string', enum: ['demo-order'] } }, required: ['orderId'], additionalProperties: false } }];
const client = getClient();
const input = [{ role: 'user', content: 'Where is demo-order?' }];
let response = await client.responses.create({ model: getModel(), input, tools, store: false, max_output_tokens: 512 });
if (response.status !== 'completed') throw Error('Incomplete tool selection');
input.push(...response.output); // Preserve all output items, including reasoning items if present.
for (const call of response.output.filter(item => item.type === 'function_call')) {
  if (call.name !== 'lookup_order') throw Error('Unknown tool');
  const { orderId } = argsSchema.parse(JSON.parse(call.arguments));
  // Server-side authorization would check this order belongs to the authenticated user.
  const result = { orderId, status: 'shipped', estimatedArrival: 'See carrier tracking' };
  input.push({ type: 'function_call_output', call_id: call.call_id, output: JSON.stringify(result) });
}
response = await client.responses.create({ model: getModel(), input, tools, tool_choice: 'none', store: false, max_output_tokens: 512 });
if (response.status !== 'completed' || !response.output_text) throw Error('No completed answer');
console.log(response.output_text);
```

The example offers one read-only demo tool, validates arguments with Zod, returns a tool result, and disables further tools for the final answer. No real order system is contacted.

**Expected behavior:** An answer grounded in the synthetic order result; wording varies.

## Try it yourself

Add an unknown-order case. Return a clear not-found result and verify that the final answer does not invent a shipment date.

## You are ready to move on when…

Explain why tool arguments cannot be trusted as authorization, even when they match a schema.

## Learn from the source

[Official OpenAI function calling guide](https://developers.openai.com/api/docs/guides/function-calling). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← LangChain for JavaScript developers](../17-langchain/README.md) · [Agents and the bounded tool loop →](../19-agents/README.md)
