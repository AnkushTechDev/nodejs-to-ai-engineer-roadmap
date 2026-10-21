const design = {
  useCase: 'Internal policy assistant',
  sourceOfTruth: 'Versioned handbook with tenant permissions',
  retrieval: 'BM25 baseline; compare dense/hybrid using held-out questions',
  generation: 'Evidence-only responses with source IDs and abstention',
  failurePolicy: 'No retrieval evidence -> no generated policy answer',
  releaseGate: 'No cross-tenant leaks; quality and latency meet measured targets',
};
for (const [decision, reason] of Object.entries(design)) console.log(`${decision}: ${reason}`);
