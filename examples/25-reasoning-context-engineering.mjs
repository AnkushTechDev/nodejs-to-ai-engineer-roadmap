// Deliberately select context instead of appending the entire conversation.
const candidates = [
  { id: 'policy', priority: 10, assumedTokens: 200, text: 'Current leave policy' },
  { id: 'old-chat', priority: 1, assumedTokens: 800, text: 'Unrelated conversation' },
  { id: 'question', priority: 100, assumedTokens: 50, text: 'Current user question' },
];
let remaining = 300;
const selected = [...candidates].sort((a, b) => b.priority - a.priority).filter(item => {
  if (item.assumedTokens > remaining) return false;
  remaining -= item.assumedTokens; return true;
});
console.log({ selected, remaining });
// Priority packing is a teaching heuristic. Preserve required instructions and dependencies.
