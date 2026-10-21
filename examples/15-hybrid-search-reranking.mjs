import { reciprocalRankFusion } from './lib/retrieval.mjs';
// Mock rankings, to isolate rank fusion from any particular search service.
const lexical = ['exact-error-code', 'policy', 'faq'];
const semantic = ['faq', 'policy', 'onboarding'];
console.log('Fused IDs and scores:', reciprocalRankFusion([lexical, semantic]));
// A real reranker reads (query, candidate text); fusion alone is not reranking.
const query = 'ERR_42';
const candidates = [{ id: 'a', text: 'ERR_42 means quota exceeded' }, { id: 'b', text: 'Quota overview' }];
console.log('Toy exact-code rerank:', candidates.sort((a, b) => Number(b.text.includes(query)) - Number(a.text.includes(query))));
