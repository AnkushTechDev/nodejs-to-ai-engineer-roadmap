# 02. The useful math: vectors, probability, and gradients

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Foundations  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [01](../01-ai-engineering/README.md)

> A few mathematical ideas explain search, model outputs, and training. You can learn them with small arrays before studying formal notation.

## Vectors are lists of numbers

A vector is an ordered list such as `[0.2, 0.8, -0.1]`. A point on a map has two coordinates; an embedding may have many more. A **matrix** is a table of numbers. Matrix multiplication combines features and is a major operation inside neural networks.

The **dot product** multiplies matching entries and adds them. **Cosine similarity** divides that dot product by the vectors’ lengths, so it compares direction. Two vectors pointing the same way score near 1; perpendicular vectors score 0. A zero vector has no direction, so our implementation explicitly returns 0 for it. Similarity is useful for ranking, but it is not a probability that two claims are equivalent.

## Probability and uncertainty

A probability distribution assigns nonnegative values that sum to 1. **Softmax** turns numerical scores into such a distribution. A **logit** is an unnormalized score before this transformation. Softmax probabilities describe the model’s distribution over options; they do not automatically measure factual truth.

Learn the mean, variance, percentiles, conditional probability, and Bayes’ rule. In production, a p95 latency tells you more about slow requests than the average alone. A confidence interval helps express uncertainty from limited evaluation samples.

## Learning means reducing an error

A **loss function** gives a numerical penalty for a bad prediction. A **gradient** tells you how the loss changes as a parameter changes. Gradient descent adjusts parameters to reduce that loss. The **learning rate** controls step size. Too large can overshoot; too small can learn slowly.

## Read and run the example

[Full JavaScript example](../../examples/02-math-for-ai.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 02
```

```javascript
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
```

First compare vector directions. Then inspect softmax output. Finally a single weight learns to map 2 to 6 by repeated gradient updates. This is a tiny training loop, not an LLM.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Change the learning rate from 0.05 to 0.5. Inspect whether the weight approaches 3. Explain what happens.

## You are ready to move on when…

Calculate a dot product by hand and explain why cosine cannot be interpreted as answer confidence.

## Learn from the source

[Google ML mathematical prerequisites](https://developers.google.com/machine-learning/crash-course/prereqs-and-prework). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← What an AI engineer actually builds](../01-ai-engineering/README.md) · [Machine learning fundamentals →](../03-machine-learning/README.md)
