import assert from 'node:assert/strict';
import { retrieve } from './lib/retrieval.mjs';
const docs = [{ id: 'private', tenantId: 'other', text: 'annual leave secret' }];
assert.deepEqual(retrieve('leave', docs, { tenantId: 'demo' }), []);
assert.throws(() => retrieve('leave', docs, {}), /tenant/);
// A scripted fake makes infrastructure tests deterministic; it cannot measure model quality.
const fakeModel = async () => ({ text: 'I do not know.', usage: { input: 10, output: 5 } });
assert.equal((await fakeModel()).text, 'I do not know.');
console.log('Isolation and fake-provider checks passed. Run npm test for the repository suite.');
