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
