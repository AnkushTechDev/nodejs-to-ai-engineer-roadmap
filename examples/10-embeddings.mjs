import { cosine, countVector } from './lib/math.mjs';
const vocabulary = ['leave', 'annual', 'remote', 'work'];
const query = countVector('annual leave', vocabulary);
for (const text of ['annual leave policy', 'remote work policy', 'holiday allowance']) {
  console.log(text, cosine(query, countVector(text, vocabulary)));
}
console.log('Notice the synonym miss: these are lexical counts, not learned semantic embeddings.');
// Run with --live for real embeddings; requires a provider key.
if (process.argv.includes('--live')) {
  const { embed } = await import('./lib/provider.mjs');
  const [a, b] = await embed(['annual leave', 'holiday allowance']);
  console.log('Semantic model cosine:', cosine(a, b));
}
