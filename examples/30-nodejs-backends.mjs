// Body validation happens before retrieval or a paid API call.
export function validateQuestion(body) {
  if (!body || typeof body.question !== 'string' || !body.question.trim() || body.question.length > 2000)
    throw new TypeError('question must be 1..2000 characters');
  return { question: body.question.trim() };
}
for (const body of [{ question: 'What is RAG?' }, { question: '' }, { question: 42 }]) {
  try { console.log(validateQuestion(body)); } catch (error) { console.log(error.message); }
}
console.log('Run npm run serve for the HTTP RAG capstone.');
