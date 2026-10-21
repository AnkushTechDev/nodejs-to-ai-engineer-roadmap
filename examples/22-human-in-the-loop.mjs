import { StateGraph, StateSchema, START, END, MemorySaver, interrupt, Command } from '@langchain/langgraph';
import { z } from 'zod';
const State = new StateSchema({ approved: z.boolean().default(false), result: z.string().default('') });
const graph = new StateGraph(State)
  .addNode('review', () => ({ approved: interrupt({ action: 'Prepare a demo refund', amount: 25 }) === true }))
  .addNode('decide', state => ({ result: state.approved ? 'Approved demo intent recorded; no money moved.' : 'Denied.' }))
  .addEdge(START, 'review').addEdge('review', 'decide').addEdge('decide', END)
  .compile({ checkpointer: new MemorySaver() });
const config = { configurable: { thread_id: 'demo-review-1' } };
console.log('Paused:', await graph.invoke({}, config));
console.log('Resumed:', await graph.invoke(new Command({ resume: true }), config));
// Hardcoded true SIMULATES an authenticated reviewer. MemorySaver lasts only in this process.
