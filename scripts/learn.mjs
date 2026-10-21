import { readFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const chapters = JSON.parse(await readFile(new URL('../topics/index.json', import.meta.url), 'utf8'));
const [selector, ...args] = process.argv.slice(2);
if (!selector || selector === '--list') {
  for (const [i, chapter] of chapters.entries()) console.log(`${String(i + 1).padStart(2, '0')} [${chapter.mode.padEnd(7)}] ${chapter.title}`);
  console.log('\nRun: npm run learn -- 14');
} else if (selector === '--offline') {
  for (const chapter of chapters.filter(chapter => chapter.mode === 'offline')) await run(chapter, []);
} else {
  const chapter = chapters.find(chapter => chapter.slug === selector || chapter.slug.split('-')[0] === selector.padStart(2, '0'));
  if (!chapter) { console.error('Unknown chapter. Run npm run learn -- --list'); process.exitCode = 1; }
  else await run(chapter, args);
}
async function run(chapter, args) {
  console.log(`\n--- ${chapter.title} [${chapter.mode}] ---`);
  const code = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ['--env-file-if-exists=.env', `examples/${chapter.slug}.mjs`, ...args], { cwd: root, stdio: 'inherit' });
    child.on('error', reject);
    child.on('exit', (code, signal) => resolve(signal ? 1 : code ?? 1));
  });
  if (code !== 0) { process.exitCode = code; throw new Error(`Example failed: ${chapter.slug}`); }
}
