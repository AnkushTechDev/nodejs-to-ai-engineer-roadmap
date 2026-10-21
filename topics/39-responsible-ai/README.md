# 39. Responsible AI, privacy, and accessible products

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Production engineering  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [26](../26-evaluation/README.md), [28](../28-security/README.md)

> Quality includes who benefits, who is harmed, and whether people can understand and challenge a system’s output.

## Start with the use case

An assistant that drafts a casual note and one that influences hiring have different consequences. Identify affected users, possible harms, escalation paths, and which decisions require qualified human review. Do not assume a general-purpose model is suitable for a high-consequence decision.

Define acceptable use and meaningful failure behavior. Make generated content and uncertainty understandable. Provide accessible interfaces: readable status messages, keyboard controls, text alternatives for audio, and a clear way to recover from an error.

## Evaluate beyond one average

Measure performance on relevant groups, languages, input styles, and accessibility needs when you have a legitimate basis and suitable data. An overall score can hide a group that consistently receives worse results. Small samples are noisy; report sample sizes and uncertainty. One parity metric cannot prove fairness across all contexts.

Bias can enter through source data, labels, retrieval coverage, model behavior, and product design. A narrow benchmark is useful evidence but does not remove the need for user feedback and monitoring.

## Respect data and ownership

Use data you are authorized to process. Minimize sensitive collection, document retention and deletion, and preserve provenance. Check licenses for datasets, model weights, and generated assets before reuse. Avoid presenting unverified output as professional advice or an authoritative record.

Maintain an incident path: users should be able to report a harmful answer, and the team should be able to trace the relevant versions and correct the underlying issue. Governance should produce clear ownership and useful controls rather than an unread checklist.

## Read and run the example

[Full JavaScript example](../../examples/39-responsible-ai.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 39
```

```javascript
const samples = [
  { group: 'A', correct: true }, { group: 'A', correct: true },
  { group: 'B', correct: true }, { group: 'B', correct: false },
];
for (const group of ['A', 'B']) {
  const rows = samples.filter(row => row.group === group);
  console.log({ group, accuracy: rows.filter(row => row.correct).length / rows.length, sampleSize: rows.length });
}
console.log('Tiny synthetic groups illustrate a disparity; they cannot establish fairness or significance.');
```

The script calculates accuracy for two tiny synthetic groups and prints sample sizes. It illustrates how an aggregate can hide differences, without claiming a fairness assessment.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Write a short model/system card for the handbook assistant: intended use, excluded uses, data sources, limitations, and feedback route.

## You are ready to move on when…

Explain why subgroup results and human escalation matter even when the overall score looks good.

## Learn from the source

[NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← Testing deterministic code and probabilistic behavior](../38-testing-ai-systems/README.md) · [A/B tests, feedback, and continuous improvement →](../40-experimentation/README.md)
