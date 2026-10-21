import { createHash } from 'node:crypto';
const keyFor = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const request = { tenantId: 'demo', permissionVersion: 2, model: 'chosen-model', promptVersion: 3, corpusVersion: 'v1', question: 'Leave policy?' };
console.log('Cache key:', keyFor(request));
console.log('Different tenant:', keyFor({ ...request, tenantId: 'other' }));
// Hypothetical rates, NOT a vendor price quote. Replace with your contracted rates.
const hypotheticalCost = ({ input, output, inputPerMillion, outputPerMillion }) =>
  (input * inputPerMillion + output * outputPerMillion) / 1_000_000;
console.log('Hypothetical dollars:', hypotheticalCost({ input: 2000, output: 300, inputPerMillion: 1, outputPerMillion: 4 }));
