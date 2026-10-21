# 23. MCP: a common interface for tools and resources

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Agents and workflows  
**Run mode:** Service: starts a local MCP stdio server and waits for a client.  
**Before this chapter:** [18](../18-tool-calling/README.md), [20](../20-langgraph/README.md)

> Model Context Protocol helps AI applications connect to tool servers through a shared protocol.

## A connector contract

Without a shared protocol, each assistant needs a custom integration for every service. MCP defines how clients discover and interact with capabilities exposed by servers. Think of it as an integration interface rather than an AI model or a reasoning framework.

A **host** is the AI application. A **client** maintains a connection to a server. A **server** exposes capabilities. **Tools** are callable operations, **resources** provide data, and **prompts** provide reusable interaction templates. Capability support depends on the implementation.

## Transport is not trust

Local servers can communicate over stdio. Networked deployments use an appropriate supported transport such as Streamable HTTP. With stdio, stdout carries protocol messages, so use stderr for diagnostics. A normal `console.log` can corrupt the protocol stream.

Discovery tells a client what a server claims to offer; it does not prove the server is trustworthy or that an action is authorized. Review server permissions, validate arguments, authenticate network access, and scope credentials. Treat tool descriptions and returned content as untrusted input. Do not pass powerful tokens through arbitrary tool arguments.

## Start with a read-only tool

The example exposes a tiny local glossary. A compatible MCP client can list the tool and call it with an allowed term. It does not automatically connect to a model, launch a desktop client, or configure authentication for a remote service.

The repository pins its SDK through the lockfile. MCP and SDK interfaces evolve, so use documentation for the installed major version when extending the server. Prefer a narrow read-only tool before adding write operations.

## Read and run the example

[Full JavaScript example](../../examples/23-model-context-protocol.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 23
```

```javascript
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
```

The script registers `explain_term` and waits on stdio. It is a long-running server, so `npm run learn -- 23` is excluded from the automatic offline runner. Stop it with Ctrl+C.

**Expected behavior:** A readiness message on stderr, then a waiting process. No answer is printed until a client calls the tool.

## Try it yourself

Connect a compatible MCP client, list tools, and call `explain_term` with `rag`. Try an invalid term and inspect the validation response.

## You are ready to move on when…

Explain the roles of host, client, and server, and why protocol compatibility does not imply authorization.

## Learn from the source

[MCP server guide](https://modelcontextprotocol.io/docs/develop/build-server). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← Human approval, interruption, and safe resumption](../22-human-in-the-loop/README.md) · [Multi-agent systems and orchestration tradeoffs →](../24-multi-agent-systems/README.md)
