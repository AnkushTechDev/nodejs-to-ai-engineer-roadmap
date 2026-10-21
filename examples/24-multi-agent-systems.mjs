// Sequential roles illustrate orchestration; these are ordinary functions, not LLM agents.
const researcher = question => ({ question, evidence: ['[policy] Annual leave is 20 days.'] });
const writer = state => ({ ...state, draft: 'Employees receive 20 days of annual leave. [policy]' });
const reviewer = state => ({ ...state, passed: state.draft.includes('[policy]') });
const output = reviewer(writer(researcher('How much leave?')));
console.log(output);
console.log('A citation marker check is NOT a factual review. Replace with evidence verification.');
