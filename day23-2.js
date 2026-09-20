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

// Bron–Kerbosch algorithm to find the largest clique.
let largest = [];

function findCliques(clique, candidates, excluded) {
  if (candidates.size === 0 && excluded.size === 0) {
    if (clique.length > largest.length) largest = clique;

    return;
  }

  [...candidates].forEach((node) => {
    const nodeNeighbours = neighbours.get(node);

    findCliques(
      [...clique, node],
      new Set([...candidates].filter((other) => nodeNeighbours.has(other))),
      new Set([...excluded].filter((other) => nodeNeighbours.has(other)))
    );

    candidates.delete(node);
    excluded.add(node);
  });
}

findCliques([], new Set(neighbours.keys()), new Set());

console.log(`Result: ${largest.sort().join(',')}`);
