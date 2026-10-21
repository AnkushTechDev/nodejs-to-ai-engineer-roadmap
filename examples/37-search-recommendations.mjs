import { cosine } from './lib/math.mjs';
// Synthetic features: [backend, design, AI]. These are not learned product embeddings.
const profile = [0.8, 0.1, 0.9];
const courses = [
  { id: 'rag', features: [0.8, 0, 1], available: true },
  { id: 'design', features: [0, 1, 0.1], available: true },
  { id: 'retired', features: [1, 0, 1], available: false },
];
console.log(courses.filter(course => course.available)
  .map(course => ({ id: course.id, score: cosine(profile, course.features) }))
  .sort((a, b) => b.score - a.score));
