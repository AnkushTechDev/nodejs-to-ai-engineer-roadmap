# Contributing

Thank you for helping make AI engineering easier to learn for Node.js developers. Useful contributions include clearer analogies, corrected technical details, small runnable examples, documented failure cases, and better exercises.

## Before changing a chapter

Read its README and example. Keep the explanation understandable to a backend developer who is new to AI. Define new terms before using them. Prefer a small working example over a long framework demo. Label synthetic data, mock models, and incomplete teaching analogies explicitly.

For API claims, use official documentation matching the installed version. Do not include hardcoded credentials or publish private training data. Avoid current-price tables that will quickly become stale. Distinguish schema validity from correctness and simulated approval from real authentication.

## Adding a topic

1. Create `topics/NN-topic-name/README.md` and `examples/NN-topic-name.mjs`.
2. Add its slug, title, phase, execution mode, and prerequisites to `topics/index.json`.
3. Update the root topic index, study plan, glossary where needed, and progress checklist.
4. Add previous/next navigation and link to setup and primary sources.
5. Include an analogy, practical explanation, code walkthrough, exercise, and readiness checkpoint.

Modes are `offline`, `api`, `local`, and `service`. Default runs of offline examples must not make network requests. Keep live behavior explicitly opt-in.

## Validate

```bash
npm ci
npm run check
npm test
npm run learn -- --offline
```

Use deterministic tests for meaningful boundaries and regressions. Keep paid evaluations separate and explicitly configured. Add a test when the change affects behavior that needs protection; a prose correction does not need an artificial test.

A pull request should explain the learner’s problem, what changed, how you verified it, and relevant limitations. If you report a security issue, do not post secrets or detailed exploit data publicly; follow [SECURITY.md](SECURITY.md).
