import test from 'node:test';
import assert from 'node:assert/strict';
import { cosine, softmax } from '../examples/lib/math.mjs';
import { chunkText, retrieve, reciprocalRankFusion } from '../examples/lib/retrieval.mjs';
import { handbook } from '../examples/lib/data.mjs';
import { answerQuestion, validateCitations } from '../projects/docs-assistant/index.mjs';
import { prepareAction, makeApproval, executeDemoAction } from '../projects/support-workflow/workflow.mjs';

test('cosine validates dimensions, finite values, and zero vectors', () => {
  assert.equal(cosine([1, 0], [2, 0]), 1);
  assert.equal(cosine([0, 0], [2, 0]), 0);
  assert.equal(cosine([1, 0], [0, 1]), 0);
  for (const [a, b] of [[[], []], [[1], [1, 2]], [[NaN], [1]], [[1], [Infinity]]]) assert.throws(() => cosine(a, b));
  assert.ok(Math.abs(softmax([1000, 999]).reduce((a, b) => a + b) - 1) < 1e-12);
});
test('chunk windows end once, preserve overlap, and reject invalid settings', () => {
  assert.deepEqual(chunkText('a b c d e', { size: 3, overlap: 1 }), ['a b c', 'c d e']);
  assert.deepEqual(chunkText('  '), []);
  assert.deepEqual(chunkText('a b', { size: 2, overlap: 1 }), ['a b']);
  for (const config of [{ size: 0, overlap: 0 }, { size: 2, overlap: 2 }, { size: 3, overlap: -1 }, { size: 2.5, overlap: 0 }])
    assert.throws(() => chunkText('a b c', config), RangeError);
});
test('retrieval uses eligible corpus statistics and never returns another tenant', () => {
  const result = retrieve('annual leave days', handbook, { tenantId: 'demo', k: 2 });
  assert.equal(result[0].id, 'leave-policy-v1');
  assert.ok(result.every(doc => doc.tenantId === 'demo'));
  const extraPrivate = [...handbook, ...Array.from({ length: 30 }, (_, i) => ({ id: `secret-${i}`, tenantId: 'other', text: 'annual leave days' }))];
  assert.deepEqual(retrieve('annual leave days', extraPrivate, { tenantId: 'demo', k: 2 }), result);
  assert.deepEqual(retrieve('zzzzunknown', handbook, { tenantId: 'demo' }), []);
  assert.throws(() => retrieve('leave', handbook), /tenant/);
  assert.throws(() => retrieve('leave', handbook, { tenantId: 'demo', k: 0 }), RangeError);
});
test('rank fusion deduplicates within a list and promotes shared candidates', () => {
  const result = reciprocalRankFusion([['a', 'b', 'b'], ['b', 'c']]);
  assert.equal(result[0][0], 'b');
  assert.equal(result.find(([id]) => id === 'b')[1], 1 / 62 + 1 / 61);
});
test('offline assistant returns excerpts, isolates tenant, and abstains without evidence', async () => {
  const result = await answerQuestion('annual leave days');
  assert.equal(result.mode, 'retrieved-excerpts');
  assert.ok(result.sources.every(source => source.id !== 'private-policy-v1'));
  assert.equal((await answerQuestion('zzzzunknown')).mode, 'abstain');
  assert.equal((await answerQuestion('leave', { tenantId: 'missing' })).mode, 'abstain');
  await assert.rejects(answerQuestion(''), /Question/);
});
test('citation boundary rejects unknown IDs and uncited factual output', () => {
  assert.deepEqual(validateCitations('20 days. [leave-policy-v1]', ['leave-policy-v1']), ['leave-policy-v1']);
  assert.deepEqual(validateCitations('I do not know.', []), []);
  assert.throws(() => validateCitations('20 days. [secret]', ['leave-policy-v1']), /outside/);
  assert.throws(() => validateCitations('20 days.', ['leave-policy-v1']), /no source/);
});
test('approval is payload-bound, tenant-scoped, expiring, and replay-safe in process', () => {
  const action = prepareAction(), reviewer = { id: 'r1', role: 'reviewer', tenantId: 'demo' }, ledger = new Set();
  const approval = makeApproval(action, reviewer, 1000);
  assert.throws(() => executeDemoAction({ ...action, amountCents: 3000 }, approval, reviewer, ledger, 2000), /mismatched/);
  assert.throws(() => executeDemoAction(action, approval, { ...reviewer, tenantId: 'other' }, ledger, 2000), /authorized/);
  assert.throws(() => executeDemoAction(action, approval, reviewer, ledger, 61000), /expired/);
  assert.equal(ledger.size, 0);
  assert.equal(executeDemoAction(action, approval, reviewer, ledger, 2000).status, 'demo-intent-recorded');
  assert.equal(executeDemoAction(action, approval, reviewer, ledger, 2000).status, 'already-recorded');
  assert.equal(ledger.size, 1);
});
