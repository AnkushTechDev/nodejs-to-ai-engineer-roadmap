# 32. Images, OCR, document understanding, and multimodal models

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Advanced and specialization  
**Run mode:** API: credentials and a compatible model are required; calls may cost money.  
**Before this chapter:** [06](../06-model-apis/README.md), [12](../12-document-ingestion/README.md), [28](../28-security/README.md)

> Many useful workflows start with screenshots, receipts, diagrams, or scanned pages rather than plain text.

## Inputs can have several modalities

A multimodal system handles more than one kind of input or output. A vision-language model can use an image and a question together. OCR extracts visible text. Document understanding combines text, layout, tables, and sometimes images to interpret a page.

Choose the narrowest useful approach. A clean digital PDF may only need text extraction. A scanned invoice may need OCR plus layout handling. A chart question may require visual reasoning. A picture can be ambiguous, and a model can confidently misread a tiny label or amount.

## Keep provenance and uncertainty

Store page numbers, bounding boxes when available, extracted fields, and source IDs. If an amount is unclear, return uncertainty or request review rather than silently guessing. Validate extracted data with business rules: totals, currency, dates, and required fields.

Image understanding is different from image generation. Generation creates or edits pixels and has its own safety, licensing, and output-verification concerns. Multimodal embeddings can support image/text search, but the chosen model must support compatible representations.

## Operational details matter

Check supported media types and input sizes for the chosen model. Resize responsibly without destroying important details. Strip unnecessary metadata when appropriate. Treat images and OCR text as untrusted content; a screenshot can contain prompt injection just like a webpage.

Do not upload sensitive documents casually. Decide which data may leave the system and what retention rules apply. For high-consequence extraction, keep a human review route and preserve the original source.

## Read and run the example

[Full JavaScript example](../../examples/32-multimodal-ai.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 32 path/to/image.png
```

```javascript
import { readFile } from 'node:fs/promises';
import { generate } from './lib/provider.mjs';
const path = process.argv[2];
if (!path || !/\.png$/i.test(path)) throw Error('Usage: node --env-file-if-exists=.env examples/32-multimodal-ai.mjs path/to/image.png');
const bytes = await readFile(path);
if (bytes.length > 4 * 1024 * 1024) throw Error('Demo accepts PNG files up to 4 MiB.');
if (!bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) throw Error('Invalid PNG signature');
const response = await generate({
  input: [{ role: 'user', content: [
    { type: 'input_text', text: 'Describe what is visible. If text is unclear, say so. Do not infer personal identity.' },
    { type: 'input_image', image_url: `data:image/png;base64,${bytes.toString('base64')}`, detail: 'auto' },
  ] }],
});
console.log(response.output_text);
```

The script reads a local PNG, checks its signature and size, and sends it to a compatible model for a description. It performs a real paid call and needs an image path; it is not an OCR benchmark.

**Expected behavior:** A model-generated description of your PNG; it may contain errors.

## Try it yourself

Use a non-sensitive screenshot with small text. Compare the description against the source and list every uncertain or incorrect detail.

## You are ready to move on when…

Explain when to use text extraction, OCR, or a vision model, and how to preserve source locations.

## Learn from the source

[Official OpenAI vision guide](https://developers.openai.com/api/docs/guides/images-vision). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← Deployment, versioning, and LLMOps](../31-deployment-llmops/README.md) · [Speech, audio, and realtime assistants →](../33-voice-and-realtime/README.md)
