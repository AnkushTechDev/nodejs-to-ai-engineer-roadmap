/** @typedef {{kind: 'generated', text: string} | {kind: 'abstain', reason: string}} Result */
/** @param {unknown} input @returns {Result} */
function parseResult(input) {
  if (input && typeof input === 'object') {
    if (input.kind === 'generated' && typeof input.text === 'string') return { kind: 'generated', text: input.text };
    if (input.kind === 'abstain' && typeof input.reason === 'string') return { kind: 'abstain', reason: input.reason };
  }
  throw new TypeError('Invalid result at runtime');
}
const result = parseResult({ kind: 'abstain', reason: 'No evidence' });
console.log(result.kind === 'generated' ? result.text : result.reason);
