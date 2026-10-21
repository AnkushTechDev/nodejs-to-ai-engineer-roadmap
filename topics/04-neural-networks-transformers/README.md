# 04. Neural networks and transformers

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Foundations  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [02](../02-math-for-ai/README.md), [03](../03-machine-learning/README.md)

> You do not need to train a transformer to use one, but its building blocks explain many strengths and limitations.

## From neurons to language models

A simple neural layer multiplies inputs by learned weights, adds a bias, and applies an activation function. Multiple layers can learn complicated relationships. During training, **backpropagation** calculates how parameters contributed to the loss. An optimizer such as SGD or Adam updates them.

A language model learns patterns for predicting tokens. **Pretraining** builds broad capabilities from large datasets. Instruction tuning and preference-based methods can then shape how it follows requests. A fluent answer is still a generated prediction, which explains why a model can sound certain while being wrong.

## What attention does

Imagine reading “The server restarted because it ran out of memory.” To interpret “it,” you need information from other words. Attention lets a token combine information from other token positions using learned relevance scores.

**Queries** ask what information is needed. **Keys** describe what each position offers. **Values** contain the information to combine. Scaled dot-product attention computes query-key scores, applies softmax, and forms a weighted sum of values. Multiple attention heads can capture different relationships.

A transformer also includes feed-forward layers, residual connections, normalization, and position information. Decoder-only models generally use causal masking so a position cannot look at future tokens during next-token training. Encoder models are useful for representations; encoder-decoder models map one sequence to another.

## What this means for applications

Context is finite. Longer input consumes compute and can make useful evidence harder to select. Repeating text does not guarantee the model will follow it. Model architecture alone does not provide database freshness, permissions, or factual verification; your application supplies those.

## Read and run the example

[Full JavaScript example](../../examples/04-neural-networks-transformers.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 04
```

```javascript
import { softmax } from './lib/math.mjs';
// One attention query over three keys. Real transformers learn Q, K and V matrices.
const query = [1, 0];
const keys = [[1, 0], [0, 1], [1, 1]];
const values = [[10, 0], [0, 10], [5, 5]];
const scores = keys.map(key => key.reduce((sum, n, i) => sum + n * query[i], 0) / Math.sqrt(2));
const weights = softmax(scores);
const context = [0, 1].map(axis => weights.reduce((sum, w, i) => sum + w * values[i][axis], 0));
console.log({ attentionWeights: weights, weightedContext: context });
```

One fixed query attends to three fixed keys and combines three values. The example deliberately omits learned projection matrices and the rest of a transformer so you can see attention itself.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Change the query to `[0, 1]`. Predict which value will receive more weight before running it.

## You are ready to move on when…

Explain queries, keys, values, and the difference between training weights and request context.

## Learn from the source

[Original transformer paper](https://arxiv.org/abs/1706.03762). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← Machine learning fundamentals](../03-machine-learning/README.md) · [Tokens, context windows, and model settings →](../05-tokens-and-context/README.md)
