import { StateGraph, START, END, StateSchema } from '@langchain/langgraph';
import { z } from 'zod';
const State = new StateSchema({ question: z.string(), route: z.string().default(''), answer: z.string().default('') });
const graph = new StateGraph(State)
  .addNode('classify', state => ({ route: /leave/i.test(state.question) ? 'policy' : 'fallback' }))
  .addNode('policy', () => ({ answer: 'Demo policy: 20 days of annual leave.' }))
  .addNode('fallback', () => ({ answer: 'I do not have evidence for that question.' }))
  .addEdge(START, 'classify')
  .addConditionalEdges('classify', state => state.route, { policy: 'policy', fallback: 'fallback' })
  .addEdge('policy', END).addEdge('fallback', END).compile();
console.log(await graph.invoke({ question: 'What is our leave policy?' }));
// Deterministic routing teaches graph mechanics without calling an LLM.
