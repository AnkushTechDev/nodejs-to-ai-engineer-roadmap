import { generate } from './lib/provider.mjs';
const response = await generate({ instructions: 'Explain concepts using simple JavaScript analogies.', input: 'What is an embedding? Use two sentences.' });
console.log(response.output_text);
console.log('Actual token usage:', response.usage);
