import { words } from './lib/math.mjs';
for (const text of ['refund approved', 'refund not approved']) {
  const tokens = words(text);
  const bigrams = tokens.slice(0, -1).map((word, i) => `${word} ${tokens[i + 1]}`);
  console.log({ text, unigrams: tokens, bigrams, badNormalization: tokens.filter(word => word !== 'not') });
}
