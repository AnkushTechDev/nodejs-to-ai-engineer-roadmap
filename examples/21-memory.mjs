// Each request must derive user/session IDs from authenticated server context.
const sessions = new Map();
function remember(userId, sessionId, message) {
  const key = JSON.stringify([userId, sessionId]);
  const history = [...(sessions.get(key) ?? []), message].slice(-4);
  sessions.set(key, history);
  return history;
}
console.log(remember('alice', 'chat1', 'I prefer concise answers.'));
console.log(remember('bob', 'chat1', 'Explain in detail.'));
console.log(remember('alice', 'chat1', 'What is RAG?'));
// Ephemeral and bounded; no cross-session search or persistence is implemented here.
