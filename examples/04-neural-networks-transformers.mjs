import { softmax } from './lib/math.mjs';
// One attention query over three keys. Real transformers learn Q, K and V matrices.
const query = [1, 0];
const keys = [[1, 0], [0, 1], [1, 1]];
const values = [[10, 0], [0, 10], [5, 5]];
const scores = keys.map(key => key.reduce((sum, n, i) => sum + n * query[i], 0) / Math.sqrt(2));
const weights = softmax(scores);
const context = [0, 1].map(axis => weights.reduce((sum, w, i) => sum + w * values[i][axis], 0));
console.log({ attentionWeights: weights, weightedContext: context });
