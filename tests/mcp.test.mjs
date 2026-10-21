import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

test('MCP stdio server discovers and executes the read-only glossary tool', { timeout: 10000 }, async t => {
  const transport = new StdioClientTransport({ command: process.execPath,
    args: [fileURLToPath(new URL('../examples/23-model-context-protocol.mjs', import.meta.url))], stderr: 'pipe' });
  const client = new Client({ name: 'roadmap-test', version: '1.0.0' });
  t.after(() => client.close());
  await client.connect(transport);
  const listed = await client.listTools();
  assert.ok(listed.tools.some(tool => tool.name === 'explain_term'));
  const result = await client.callTool({ name: 'explain_term', arguments: { term: 'rag' } });
  assert.equal(result.isError, undefined);
  assert.match(result.content[0].text, /Retrieve evidence/);
  const invalid = await client.callTool({ name: 'explain_term', arguments: { term: 'not-a-term' } });
  assert.equal(invalid.isError, true);
});
