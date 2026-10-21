import OpenAI from 'openai';
export function getClient() {
  if (!process.env.OPENAI_API_KEY) throw new Error('Set OPENAI_API_KEY in .env. See .env.example.');
  // One bounded SDK retry policy; avoid multiplying retries in outer loops.
  return new OpenAI({ timeout: 30_000, maxRetries: 2 });
}
export function getModel() {
  if (!process.env.OPENAI_MODEL) throw new Error('Set OPENAI_MODEL to a model available to your account.');
  return process.env.OPENAI_MODEL;
}
export async function generate(prompt, extra = {}) {
  const response = await getClient().responses.create({
    model: getModel(), ...prompt, max_output_tokens: 512, store: false, ...extra,
  });
  if (response.status !== 'completed') throw new Error(`Response did not complete: ${response.status}`);
  if (!response.output_text) throw new Error('No text returned; inspect refusal/tool output separately.');
  return response;
}
export async function embed(texts) {
  const response = await getClient().embeddings.create({
    model: process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small', input: texts,
  });
  return response.data.sort((a, b) => a.index - b.index).map(row => row.embedding);
}
