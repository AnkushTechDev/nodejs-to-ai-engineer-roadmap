const samples = [
  { group: 'A', correct: true }, { group: 'A', correct: true },
  { group: 'B', correct: true }, { group: 'B', correct: false },
];
for (const group of ['A', 'B']) {
  const rows = samples.filter(row => row.group === group);
  console.log({ group, accuracy: rows.filter(row => row.correct).length / rows.length, sampleSize: rows.length });
}
console.log('Tiny synthetic groups illustrate a disparity; they cannot establish fairness or significance.');
