// A tiny nearest-neighbor classifier. Features are already normalized.
const train = [
  { x: [0.9, 0.1], label: 'spam' },
  { x: [0.8, 0.2], label: 'spam' },
  { x: [0.1, 0.9], label: 'normal' },
];
const test = [{ x: [0.2, 0.8], label: 'normal' }, { x: [0.85, 0.15], label: 'spam' }];
const predict = x => [...train].sort((a, b) => distance(x, a.x) - distance(x, b.x))[0].label;
function distance(a, b) { return Math.hypot(...a.map((n, i) => n - b[i])); }
const correct = test.filter(row => predict(row.x) === row.label).length;
console.log({ predictions: test.map(row => predict(row.x)), accuracy: correct / test.length });
// Two held-out rows illustrate evaluation; they are far too few to establish real quality.
