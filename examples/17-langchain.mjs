import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatOpenAI } from '@langchain/openai';
import { getModel } from './lib/provider.mjs';
const prompt = ChatPromptTemplate.fromMessages([
  ['system', 'Explain AI concepts to a Node.js developer in two sentences.'],
  ['human', '{topic}'],
]);
const model = new ChatOpenAI({ model: getModel(), maxRetries: 2, timeout: 30000 });
const chain = prompt.pipe(model).pipe(new StringOutputParser());
console.log(await chain.invoke({ topic: 'vector search' }));
