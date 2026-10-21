// Offline release gate: in practice these values come from a versioned evaluation run.
const candidate = { version: 'prompt-v2', recall: 0.9, p95Ms: 1800, crossTenantLeaks: 0 };
const checks = { retrieval: candidate.recall >= 0.85, latency: candidate.p95Ms < 2500, isolation: candidate.crossTenantLeaks === 0 };
console.log({ candidate, checks, releaseAllowed: Object.values(checks).every(Boolean) });
console.log('These demo thresholds are illustrative. Canary, monitor, then expand traffic.');
