import { pathToFileURL } from 'node:url';
import { handbook } from '../../examples/lib/data.mjs';
import { cosine } from '../../examples/lib/math.mjs';
import { retrieve, groundedPrompt, reciprocalRankFusion } from '../../examples/lib/retrieval.mjs';

export function validateCitations(answer, sourceIds) {
  const cited = [...answer.matchAll(/\[([^\]]+)\]/g)].map(match => match[1]);
  const allowed = new Set(sourceIds);
  if (cited.some(id => !allowed.has(id))) throw new Error('Answer cited a source outside retrieved evidence');
  if (!cited.length && answer.trim() !== 'I do not know.') throw new Error('Answer has no source citation');
  // This checks citation IDs only. It does NOT establish claim support.
  return [...new Set(cited)];
}
export async function answerQuestion(question, { live = false, tenantId = 'demo' } = {}) {
  if (typeof question !== 'string' || !question.trim() || question.length > 2000) throw new TypeError('Question must contain 1..2000 characters');
  const eligible = handbook.filter(doc => doc.tenantId === tenantId);
  if (!eligible.length) return { mode: 'abstain', answer: 'I do not know.', sources: [] };
  if (!live) {
    const hits = retrieve(question, handbook, { tenantId, k: 2 });
    if (!hits.length) return { mode: 'abstain', answer: 'I do not know.', sources: [] };
    return { mode: 'retrieved-excerpts', question, sources: hits.map(({ id, text }) => ({ id, text })) };
  }
  // Small teaching corpus: re-embeds eligible documents each invocation. Cache/version a real index.
  const { embed, generate } = await import('../../examples/lib/provider.mjs');
  const [queryVector, ...vectors] = await embed([question, ...eligible.map(doc => doc.text)]);
  const dense = eligible.map((doc, i) => ({ id: doc.id, score: cosine(queryVector, vectors[i]) })).sort((a, b) => b.score - a.score);
  const lexical = retrieve(question, handbook, { tenantId, k: 3 });
  const ranked = reciprocalRankFusion([lexical.map(doc => doc.id), dense.map(doc => doc.id)]);
  const hits = ranked.slice(0, 2).map(([id]) => eligible.find(doc => doc.id === id));
  const prompt = groundedPrompt(question, hits);
  prompt.instructions += ' If the evidence cannot answer the question, return exactly: I do not know.';
  const response = await generate(prompt);
  const citations = validateCitations(response.output_text, hits.map(doc => doc.id));
  return { mode: response.output_text.trim() === 'I do not know.' ? 'abstain' : 'generated', answer: response.output_text,
    citations, sources: hits.map(({ id, text }) => ({ id, text })), usage: response.usage };
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const live = process.argv.includes('--live');
  const question = process.argv.slice(2).filter(arg => arg !== '--live').join(' ') || 'How many days of annual leave do employees receive?';
  try { console.log(JSON.stringify(await answerQuestion(question, { live }), null, 2)); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
