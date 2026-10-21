import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
const server = new McpServer({ name: 'roadmap-demo', version: '1.0.0' });
server.registerTool('explain_term', {
  description: 'Read a definition from the small local AI glossary.',
  inputSchema: { term: z.enum(['rag', 'embedding']) },
}, async ({ term }) => ({ content: [{ type: 'text', text: {
  rag: 'Retrieve evidence, then provide it to a generator.',
  embedding: 'A learned numerical representation used to compare inputs.',
}[term] }] }));
// Stdout belongs to the JSON-RPC protocol. Log diagnostics to stderr only.
await server.connect(new StdioServerTransport());
console.error('MCP server ready on stdio; connect a compatible MCP client. Ctrl+C to stop.');
