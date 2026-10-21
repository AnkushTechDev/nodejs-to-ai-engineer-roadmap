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
