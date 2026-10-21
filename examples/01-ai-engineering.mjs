// An AI feature still needs ordinary software boundaries.
const request = { userId: 'u1', text: 'Summarize my support ticket' };
const pipeline = [
  ['validate', value => { if (!value.text?.trim()) throw Error('Text required'); return value; }],
  ['prepare context', value => ({ ...value, context: 'Ticket: package arrived late.' })],
  // Deterministic stand-in so this architecture lesson costs nothing.
  ['demo model boundary', value => ({ ...value, answer: 'The package arrived late.' })],
  ['format', value => ({ answer: value.answer, source: 'ticket' })],
];
let state = request;
for (const [name, step] of pipeline) { state = step(state); console.log(name, state); }
