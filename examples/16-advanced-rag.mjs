// Parent-child retrieval: match a small chunk, return its larger source section.
const parents = new Map([['policy', 'Annual leave: 20 days. Requests need manager approval. Public holidays are separate.']]);
const matchedChild = { id: 'policy:2', parentId: 'policy', text: 'Requests need manager approval.' };
console.log({ matched: matchedChild.text, expandedContext: parents.get(matchedChild.parentId) });
const relevant = new Set(['policy:2', 'policy:3']);
const retrieved = ['policy:2', 'unrelated'];
console.log('Recall@2:', retrieved.filter(id => relevant.has(id)).length / relevant.size);
