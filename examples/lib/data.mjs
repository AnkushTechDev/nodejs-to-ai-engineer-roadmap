import { readFile } from 'node:fs/promises';
export const handbook = JSON.parse(await readFile(new URL('../data/handbook.json', import.meta.url), 'utf8'));
