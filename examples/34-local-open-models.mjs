const model = process.env.OLLAMA_MODEL;
if (!model) throw Error('Set OLLAMA_MODEL to a downloaded text model. See chapter 34.');
const response = await fetch('http://127.0.0.1:11434/api/chat', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(60000),
  body: JSON.stringify({ model, messages: [{ role: 'user', content: 'Explain vector search in two sentences.' }], stream: false }),
});
if (!response.ok) throw Error(`Local model HTTP ${response.status}`);
const result = await response.json();
if (!result.message?.content) throw Error('No text returned');
console.log(result.message.content);
