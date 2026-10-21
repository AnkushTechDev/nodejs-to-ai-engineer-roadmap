# 12. Document loading, parsing, and cleaning

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Retrieval and RAG  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [11](../11-vector-databases/README.md)

> Good RAG begins with trustworthy text and metadata. A powerful model cannot recover facts your parser discarded.

## Turn source files into dependable records

Ingestion means reading source data and preparing it for search. Sources may be Markdown files, PDFs, web pages, database rows, or support tickets. A document loader fetches content; a parser extracts usable text and structure. These are distinct jobs.

A PDF can contain selectable text, scanned images, columns, tables, or all of them. Scans may need OCR. Tables often lose meaning if cells are flattened without headers. HTML extraction should remove navigation clutter while preserving headings, dates, and source links. Do not assume every parser gives identical output.

## Keep the information needed later

Attach source IDs, tenant permissions, title, section, version or content hash, timestamps, and provenance. You need these for citations, update handling, deletion, debugging, and access checks. Normalize line endings and whitespace carefully; aggressive cleaning can destroy code indentation or table boundaries.

Use a stable source ID plus content version. If the content hash has not changed, avoid embedding it again. If it changed, create the new searchable version and retire stale chunks safely. If a user loses access or a document is deleted, invalidation must reach both indexes and caches.

## Treat fetched content as untrusted

Limit file sizes and parser runtime. Reject unsupported formats. Avoid fetching arbitrary user-controlled URLs with unrestricted network access: a loader can otherwise become an SSRF path into internal services. Do not execute scripts or macros in source files. Preserve an audit trail without writing private document bodies into ordinary logs.

## Read and run the example

[Full JavaScript example](../../examples/12-document-ingestion.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 12
```

```javascript
import { createHash } from 'node:crypto';
const raw = '  Annual leave policy\r\nEmployees receive 20 days.  ';
const text = raw.replace(/\r\n/g, '\n').trim();
const doc = {
  id: 'leave-policy', tenantId: 'demo', source: 'handbook.md',
  version: createHash('sha256').update(text).digest('hex'), text,
};
console.log(doc);
console.log('Ingest the same hash twice: skip re-embedding. Change text: build a new version.');
```

The script normalizes line endings and creates a content hash plus metadata. It is a text-record example, not a PDF/OCR implementation; inspect your parser’s actual output when extending it.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Build a Markdown loader for two files. Preserve headings and source paths, hash each record, and skip unchanged files on a second run.

## You are ready to move on when…

Explain how provenance, permissions, and document deletion move through an ingestion pipeline.

## Learn from the source

[LangChain JavaScript retrieval documentation](https://docs.langchain.com/oss/javascript/langchain/retrieval). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← Vector databases, pgvector, and indexes](../11-vector-databases/README.md) · [Chunking: splitting text without losing meaning →](../13-chunking/README.md)
