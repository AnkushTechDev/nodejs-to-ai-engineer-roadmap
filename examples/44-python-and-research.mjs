// Node.js consumes a model-service contract; Python can own training behind it.
const request = { schemaVersion: 1, features: [[0.2, 0.8], [0.9, 0.1]] };
// Synthetic service response. No Python server or trained model runs here.
const response = { schemaVersion: 1, modelVersion: 'demo-v1', scores: [0.15, 0.9] };
if (response.schemaVersion !== request.schemaVersion || response.scores.length !== request.features.length)
  throw Error('Incompatible model service response');
console.log(response);
