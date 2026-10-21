import assert from 'node:assert/strict';
const rows = [
  { id: 'a1', sourceGroup: 'policy-a', text: 'Leave allowance?' },
  { id: 'a2', sourceGroup: 'policy-a', text: 'How much leave?' },
  { id: 'b1', sourceGroup: 'policy-b', text: 'Expense deadline?' },
];
const testGroups = new Set(['policy-b']);
const train = rows.filter(row => !testGroups.has(row.sourceGroup));
const test = rows.filter(row => testGroups.has(row.sourceGroup));
assert.ok(train.every(row => !test.some(other => other.sourceGroup === row.sourceGroup)));
console.log({ train, test });
