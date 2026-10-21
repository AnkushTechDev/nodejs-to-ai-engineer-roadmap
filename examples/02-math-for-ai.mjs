import { cosine, softmax } from './lib/math.mjs';
console.log('Same direction:', cosine([1, 2], [2, 4]));
console.log('Perpendicular:', cosine([1, 0], [0, 1]));
console.log('Probabilities:', softmax([2, 1, 0]));
// Minimize (weight * input - target)^2 with one gradient update.
let weight = 0;
for (let step = 0; step < 20; step++) {
  const input = 2, target = 6;
  const prediction = weight * input;
  const gradient = 2 * (prediction - target) * input;
  weight -= 0.05 * gradient;
}
console.log('Learned weight, near 3:', weight);
