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
