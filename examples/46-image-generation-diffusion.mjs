// Numerical refinement analogy only: no trained denoiser and no image generation.
const target = [0.2, 0.8, 0.4];
let current = [0.9, -0.2, 1.2];
for (let step = 0; step < 5; step++) {
  current = current.map((value, i) => value + 0.5 * (target[i] - value));
  console.log({ step, current });
}
console.log('Unlike this analogy, a real diffusion sampler does not know the target image.');
