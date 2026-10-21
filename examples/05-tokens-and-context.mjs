// These are assumed counts, NOT a tokenizer. Use the chosen model's tokenizer in production.
export function contextBudget({ window, instructions, history, evidence, output }) {
  const used = instructions + history + evidence + output;
  return { used, remaining: window - used, fits: used <= window };
}
console.log(contextBudget({ window: 8000, instructions: 500, history: 2000, evidence: 4000, output: 1000 }));
console.log(contextBudget({ window: 8000, instructions: 500, history: 4000, evidence: 4000, output: 1000 }));
