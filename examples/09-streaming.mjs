import { getClient, getModel } from './lib/provider.mjs';
const stream = await getClient().responses.create({
  model: getModel(), input: 'Explain RAG in three short sentences.', stream: true,
  store: false, max_output_tokens: 512,
});
let completed = false;
for await (const event of stream) {
  if (event.type === 'response.output_text.delta') process.stdout.write(event.delta);
  if (event.type === 'response.refusal.delta') process.stderr.write(event.delta);
  if (event.type === 'response.completed') completed = true;
  if (['response.failed', 'response.incomplete', 'error'].includes(event.type)) throw Error(`Stream failed: ${event.type}`);
}
if (!completed) throw Error('Stream ended without completion');
process.stdout.write('\n');
