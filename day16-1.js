const fs = require('fs');

const grid = fs.readFileSync('day16-input.txt', 'utf8').trim().split('\n');
const deltas = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
const width = grid[0].length;

let start;
let end;

grid.forEach((row, y) =>
  row.split('').forEach((cell, x) => {
    if (cell === 'S') start = y * width + x;
    if (cell === 'E') end = y * width + x;
  })
);

// Dijkstra over (cell, direction) states with a simple bucket queue, since costs are small integers.
const distances = new Map();
const buckets = new Map();
const key = (position, direction) => position * 4 + direction;

function push(cost, position, direction) {
  const k = key(position, direction);

  if (distances.has(k) && distances.get(k) <= cost) return;

  distances.set(k, cost);

  if (!buckets.has(cost)) buckets.set(cost, []);

  buckets.get(cost).push([position, direction]);
}

push(0, start, 1);

let result;

for (let cost = 0; result === undefined; cost++) {
  const bucket = buckets.get(cost);

  if (!bucket) {
    if (cost > 10000000) break;

    continue;
  }

  for (let i = 0; i < bucket.length; i++) {
    const [position, direction] = bucket[i];

    if (distances.get(key(position, direction)) !== cost) continue;

    if (position === end) {
      result = cost;

      break;
    }

    const y = Math.floor(position / width);
    const x = position % width;
    const ny = y + deltas[direction][0];
    const nx = x + deltas[direction][1];

    if (grid[ny][nx] !== '#') push(cost + 1, ny * width + nx, direction);

    push(cost + 1000, position, (direction + 1) % 4);
    push(cost + 1000, position, (direction + 3) % 4);
  }
}

console.log(`Result: ${result}`);
