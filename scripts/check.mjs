import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
const root = fileURLToPath(new URL('../', import.meta.url));
const files = [];
async function walk(folder) {
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    if (['node_modules', '.git', '.local'].includes(entry.name)) continue;
    const full = path.join(folder, entry.name);
    if (entry.isDirectory()) await walk(full); else files.push(full);
  }
}
await walk(root);
const errors = [];
const manifest = JSON.parse(await readFile(path.join(root, 'topics/index.json'), 'utf8'));
const seen = new Set();
for (const [i, chapter] of manifest.entries()) {
  if (seen.has(chapter.slug)) errors.push(`Duplicate chapter ${chapter.slug}`);
  seen.add(chapter.slug);
  if (!chapter.slug.startsWith(String(i + 1).padStart(2, '0') + '-')) errors.push(`Out-of-order chapter ${chapter.slug}`);
  if (!['offline', 'api', 'local', 'service'].includes(chapter.mode)) errors.push(`Unknown mode ${chapter.slug}`);
  for (const prerequisite of chapter.prereqs) if (!manifest[prerequisite - 1]) errors.push(`Missing prerequisite ${prerequisite}`);
  for (const file of [`topics/${chapter.slug}/README.md`, `examples/${chapter.slug}.mjs`]) {
    try { await access(path.join(root, file)); } catch { errors.push(`Missing ${file}`); }
  }
}
for (const full of files.filter(file => file.endsWith('.mjs'))) {
  const result = spawnSync(process.execPath, ['--check', full], { encoding: 'utf8' });
  if (result.status !== 0) errors.push(result.stderr);
}
function anchors(markdown) {
  const counts = new Map(), result = new Set();
  for (const match of markdown.matchAll(/^#{1,6}\s+(.+?)\s*#*$/gm)) {
    const base = match[1].replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').toLowerCase()
      .replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s/g, '-');
    const count = counts.get(base) ?? 0;
    result.add(count ? `${base}-${count}` : base); counts.set(base, count + 1);
  }
  return result;
}
for (const full of files.filter(file => file.endsWith('.md'))) {
  const source = await readFile(full, 'utf8');
  for (const match of source.matchAll(/!?\[[^\]\n]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const url = match[1];
    if (/^(https?:|mailto:)/i.test(url)) continue;
    const [relative, fragment] = url.split('#');
    const target = relative ? path.resolve(path.dirname(full), decodeURIComponent(relative)) : full;
    try {
      await access(target);
      if (fragment && target.endsWith('.md')) {
        const headings = anchors(await readFile(target, 'utf8'));
        if (!headings.has(decodeURIComponent(fragment))) errors.push(`Missing anchor ${url} in ${path.relative(root, full)}`);
      }
    } catch { errors.push(`Broken local link ${url} in ${path.relative(root, full)}`); }
  }
}
const home = await readFile(path.join(root, 'README.md'), 'utf8');
for (const chapter of manifest) if (!home.includes(`topics/${chapter.slug}/README.md`)) errors.push(`Not indexed: ${chapter.slug}`);
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`Checked ${manifest.length} chapters, JavaScript syntax, local Markdown links and anchors. External URLs and prose accuracy are not checked.`);
