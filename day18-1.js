const fs = require('fs');

const SIZE = 71;
const BYTES = 1024;
const bytes = fs
  .readFileSync('day18-input.txt', 'utf8')
  .trim()
  .split('\n')
  .map((row) => row.split(',').map(Number));
const deltas = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function shortestPath(byteCount) {
  const blocked = new Set(bytes.slice(0, byteCount).map(([x, y]) => `${x}|${y}`));
  const seen = new Set(['0|0']);
  let queue = [[0, 0]];

  for (let steps = 0; queue.length > 0; steps++) {
    const next = [];

    for (const [x, y] of queue) {
      if (x === SIZE - 1 && y === SIZE - 1) return steps;

      for (const [dy, dx] of deltas) {
        const nx = x + dx;
        const ny = y + dy;
        const k = `${nx}|${ny}`;

        if (nx < 0 || ny < 0 || nx >= SIZE || ny >= SIZE || blocked.has(k) || seen.has(k)) continue;

        seen.add(k);
        next.push([nx, ny]);
      }
    }

    queue = next;
  }

  return null;
}

console.log(`Result: ${shortestPath(BYTES)}`);
