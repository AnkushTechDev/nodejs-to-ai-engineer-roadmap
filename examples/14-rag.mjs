import { handbook } from './lib/data.mjs';
import { retrieve, groundedPrompt } from './lib/retrieval.mjs';
const question = 'How many days of annual leave do employees receive?';
const hits = retrieve(question, handbook, { tenantId: 'demo', k: 2 });
console.log('Retrieved evidence:', hits);
console.log('Prompt for generation:', groundedPrompt(question, hits));
console.log('This offline example prepares evidence; it does not generate an answer.');
// The complete CLI in projects/docs-assistant supports real generation with --live.
