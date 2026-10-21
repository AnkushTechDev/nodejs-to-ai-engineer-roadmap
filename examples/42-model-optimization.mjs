// Toy symmetric quantization: map floats into signed 8-bit integers plus a scale.
const weights = [0.12, -0.7, 1.4, -0.08];
const scale = Math.max(...weights.map(Math.abs)) / 127;
const quantized = Int8Array.from(weights.map(value => Math.round(value / scale)));
const restored = [...quantized].map(value => value * scale);
const meanSquaredError = weights.reduce((sum, value, i) => sum + (value - restored[i]) ** 2, 0) / weights.length;
console.log({ weights, quantized: [...quantized], scale, restored, meanSquaredError });
// This illustrates rounding error, not a model quantizer or a speed benchmark.
