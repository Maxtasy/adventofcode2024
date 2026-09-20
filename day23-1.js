const fs = require('fs');

const connections = fs
  .readFileSync('day23-input.txt', 'utf8')
  .trim()
  .split('\n')
  .map((row) => row.split('-'));
const neighbours = new Map();

connections.forEach(([a, b]) => {
  if (!neighbours.has(a)) neighbours.set(a, new Set());
  if (!neighbours.has(b)) neighbours.set(b, new Set());

  neighbours.get(a).add(b);
  neighbours.get(b).add(a);
});

const triangles = new Set();

connections.forEach(([a, b]) => {
  neighbours.get(a).forEach((c) => {
    if (neighbours.get(b).has(c)) triangles.add([a, b, c].sort().join(','));
  });
});

const result = [...triangles].filter((triangle) => triangle.split(',').some((name) => name.startsWith('t'))).length;

console.log(`Result: ${result}`);
