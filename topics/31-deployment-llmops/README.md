# 31. Deployment, versioning, and LLMOps

[Roadmap index](../../README.md#topic-index) · [Setup](../../START_HERE.md) · [Glossary](../../GLOSSARY.md)

**Stage:** Production engineering  
**Run mode:** Offline: no API key or external service required.  
**Before this chapter:** [26](../26-evaluation/README.md), [27](../27-observability/README.md), [29](../29-cost-latency-caching/README.md), [30](../30-nodejs-backends/README.md)

> Releasing an AI feature safely means versioning more than source code and monitoring more than server uptime.

## A release is a bundle of decisions

Record application code, prompt templates, model configuration, embedding model, index schema, corpus snapshot, and evaluation dataset. If a release regresses, you need to know which changed. A model alias or an updated document can change behavior without a Git commit.

**LLMOps** is the operational work around model-powered applications: evaluation, deployment, observation, feedback, and controlled updates. It overlaps with ordinary DevOps and MLOps. The name does not imply a particular product.

## Release in stages

Run offline tests and evaluations first. Shadow traffic can compare a candidate without showing its answers to users, subject to privacy and cost rules. A canary serves a small controlled share of requests. Expand only if quality, security, latency, and cost remain acceptable. Define rollback triggers before release.

Use environment secrets or a secret manager. Avoid baking keys into images. Use separate development and production credentials with spending limits and minimal permissions. Container health checks should reflect service readiness without making paid generation calls on every probe.

## State changes need a plan

Changing embedding models requires a compatible rebuilt index. Use a new index version, evaluate it, then switch traffic. Retire old versions after rollback needs expire. Document deletions and permission changes may need immediate propagation and cannot wait for a normal release cycle.

Back up durable workflow state and know how recovery works. A workflow replay must not repeat external side effects. Test failure paths such as provider outages and queue backlogs. A green CI check is a prerequisite, not proof of production readiness.

## Read and run the example

[Full JavaScript example](../../examples/31-deployment-llmops.mjs)

```bash
# Run from the repository root, after following START_HERE.md.
npm run learn -- 31
```

```javascript
// Offline release gate: in practice these values come from a versioned evaluation run.
const candidate = { version: 'prompt-v2', recall: 0.9, p95Ms: 1800, crossTenantLeaks: 0 };
const checks = { retrieval: candidate.recall >= 0.85, latency: candidate.p95Ms < 2500, isolation: candidate.crossTenantLeaks === 0 };
console.log({ candidate, checks, releaseAllowed: Object.values(checks).every(Boolean) });
console.log('These demo thresholds are illustrative. Canary, monitor, then expand traffic.');
```

The example applies a few illustrative quality, latency, and isolation gates to a synthetic release record. Real values should come from versioned measurements.

**Expected behavior:** Inspect the labeled values in stdout and compare them with the walkthrough above. Output is deterministic except for timings and generated IDs where present.

## Try it yourself

Write a rollback plan for a new prompt and a separate plan for a new embedding model. Identify which stored artifacts each requires.

## You are ready to move on when…

List the versions needed to reproduce an answer and explain why an index migration differs from a prompt change.

## Learn from the source

[Docker Node.js guide](https://docs.docker.com/guides/nodejs/). API details can change; compare the installed version with official documentation. See [sources and verification notes](../../RESOURCES.md).

---

[← Building AI HTTP APIs in Node.js](../30-nodejs-backends/README.md) · [Images, OCR, document understanding, and multimodal models →](../32-multimodal-ai/README.md)
