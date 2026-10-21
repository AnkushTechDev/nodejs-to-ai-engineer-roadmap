// Inspect a training row without uploading anything or starting a training job.
const row = { messages: [
  { role: 'system', content: 'Classify support tickets. Return one label: billing, technical, other.' },
  { role: 'user', content: 'I was charged twice.' },
  { role: 'assistant', content: 'billing' },
] };
const testRow = { messages: [{ role: 'user', content: 'My invoice has a duplicate payment.' }] };
console.log('Training JSONL row:', JSON.stringify(row));
console.log('Held-out example:', testRow);
console.log('Split by customer/time/source before generating paraphrases; avoid leakage.');
