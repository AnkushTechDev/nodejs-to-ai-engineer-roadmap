import { chunkText } from './lib/retrieval.mjs';
const text = 'Leave requires approval from your manager. Submit requests before booking travel. Public holidays do not use your annual leave allowance.';
console.log(chunkText(text, { size: 10, overlap: 3 }).map((text, i) => ({ id: `policy:${i}`, text })));
// A word window can cut a sentence. Compare sentence/heading boundaries in the exercise.
