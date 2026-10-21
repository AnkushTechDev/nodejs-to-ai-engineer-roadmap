/** Cosine compares direction, not length; unrelated vectors can still score > 0. */
export function cosine(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || !a.length || a.length !== b.length ||
      ![...a, ...b].every(Number.isFinite)) throw new TypeError('Expected finite, equal-sized vectors');
  const dot = a.reduce((sum, value, i) => sum + value * b[i], 0);
  const norm = values => Math.hypot(...values);
  const denominator = norm(a) * norm(b);
  return denominator === 0 ? 0 : dot / denominator;
}
export const words = text => text.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [];
/** Fixed dictionary counts: lexical teaching aid, NOT a semantic embedding model. */
export function countVector(text, vocabulary) {
  const counts = new Map();
  for (const token of words(text)) counts.set(token, (counts.get(token) ?? 0) + 1);
  return vocabulary.map(token => counts.get(token) ?? 0);
}
export function softmax(logits) {
  const max = Math.max(...logits);
  const exps = logits.map(value => Math.exp(value - max));
  const total = exps.reduce((a, b) => a + b, 0);
  return exps.map(value => value / total);
}
