# 03. Machine learning fundamentals

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Foundations  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [02](../02-math-for-ai/README.md)

> Understanding training and evaluation helps you avoid misleading results even when you use someone else’s model.

## Learning rules from examples

Ordinary code might say “if this message contains a suspicious link, flag it.” An ML classifier learns a decision rule from labeled messages. A **feature** is an input measurement. A **label** is the target answer. **Training** fits the model; **inference** uses the fitted model on new inputs.

**Supervised learning** uses labeled pairs, such as ticket → department. **Unsupervised learning** finds structure without target labels, such as grouping similar tickets. **Reinforcement learning** optimizes behavior using rewards from interactions. It is not the same as training on a spreadsheet of correct answers.

## The split matters

Use training data to fit parameters, validation data to choose settings, and a held-out test set for the final comparison. Split by customer, document, or time when similar rows could leak between sets. If paraphrases of the same ticket appear in both training and test, the score can look excellent without proving generalization.

**Overfitting** means learning details of the training set that do not transfer. **Underfitting** means the model misses important patterns. Regularization, better data, and sensible model capacity help, but always compare against a simple baseline.

## Choose metrics for the problem

Accuracy can hide failures on rare classes. Precision asks “of predicted positives, how many were right?” Recall asks “of actual positives, how many were found?” F1 balances them. A confusion matrix shows which classes are mixed up. Regression uses metrics such as MAE and RMSE. Clustering needs a definition of useful groups, not just a pretty plot.

Learn linear/logistic regression, decision trees, random forests, gradient boosting, k-nearest neighbors, k-means, feature scaling, class imbalance, and cross-validation. You do not need deep learning for every predictive task.

## Read and run the example

[Full JavaScript example](../../examples/03-machine-learning.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 03
```

```javascript
// A tiny nearest-neighbor classifier. Features are already normalized.
const train = [
  { x: [0.9, 0.1], label: 'spam' },
  { x: [0.8, 0.2], label: 'spam' },
  { x: [0.1, 0.9], label: 'normal' },
];
const test = [{ x: [0.2, 0.8], label: 'normal' }, { x: [0.85, 0.15], label: 'spam' }];
const predict = x => [...train].sort((a, b) => distance(x, a.x) - distance(x, b.x))[0].label;
function distance(a, b) { return Math.hypot(...a.map((n, i) => n - b[i])); }
const correct = test.filter(row => predict(row.x) === row.label).length;
console.log({ predictions: test.map(row => predict(row.x)), accuracy: correct / test.length });
// Two held-out rows illustrate evaluation; they are far too few to establish real quality.
```

The example labels a new point using its closest training point. The two test rows demonstrate a held-out metric, but are much too small for a meaningful performance claim.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Add an imbalanced test set and compare a classifier that always predicts the majority label against the nearest-neighbor rule.

## You are ready to move on when…

Explain data leakage, overfitting, and why 99% accuracy can still be useless.

## Learn from the source

[Google ML Crash Course](https://developers.google.com/machine-learning/crash-course). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← The useful math: vectors, probability, and gradients](../02-math-for-ai/README.md) · [Neural networks and transformers →](../04-neural-networks-transformers/README.md)
