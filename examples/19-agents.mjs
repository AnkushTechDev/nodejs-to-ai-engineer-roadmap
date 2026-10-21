import { createAgent, tool } from 'langchain';
import { ChatOpenAI } from '@langchain/openai';
import { z } from 'zod';
import { getModel } from './lib/provider.mjs';
const lookup = tool(async ({ orderId }) => JSON.stringify({ orderId, status: 'shipped' }), {
  name: 'lookup_order', description: 'Read status of the demo order.',
  schema: z.object({ orderId: z.enum(['demo-order']) }),
});
const agent = createAgent({
  model: new ChatOpenAI({ model: getModel(), timeout: 30000, maxRetries: 1 }),
  tools: [lookup], systemPrompt: 'Help with order status. Use lookup_order for facts. Never invent delivery dates.',
});
const result = await agent.invoke({ messages: [{ role: 'user', content: 'Where is demo-order?' }] }, { recursionLimit: 6 });
console.log(result.messages.at(-1).content);
