const fs = require('fs');

const grid = fs.readFileSync('day16-input.txt', 'utf8').trim().split('\n');
const deltas = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
const width = grid[0].length;
const key = (position, direction) => position * 4 + direction;

let start;
let end;

grid.forEach((row, y) =>
  row.split('').forEach((cell, x) => {
    if (cell === 'S') start = y * width + x;
    if (cell === 'E') end = y * width + x;
  })
);

// Returns the cheapest cost to every (cell, direction) state.
// `moves` yields the neighbouring states of a state together with their cost.
function dijkstra(startStates, moves) {
  const distances = new Map();
  const buckets = new Map();
  let maxCost = 0;

  const push = (cost, k) => {
    if (distances.has(k) && distances.get(k) <= cost) return;

    distances.set(k, cost);

    if (!buckets.has(cost)) buckets.set(cost, []);

    buckets.get(cost).push(k);
    maxCost = Math.max(maxCost, cost);
  };

  startStates.forEach((k) => push(0, k));

  for (let cost = 0; cost <= maxCost; cost++) {
    const bucket = buckets.get(cost);

    if (!bucket) continue;

    for (let i = 0; i < bucket.length; i++) {
      const k = bucket[i];

      if (distances.get(k) !== cost) continue;

      moves(k).forEach(([nextKey, stepCost]) => push(cost + stepCost, nextKey));
    }
  }

  return distances;
}

function forwardMoves(k) {
  const direction = k % 4;
  const position = (k - direction) / 4;
  const ny = Math.floor(position / width) + deltas[direction][0];
  const nx = (position % width) + deltas[direction][1];
  const result = [
    [key(position, (direction + 1) % 4), 1000],
    [key(position, (direction + 3) % 4), 1000],
  ];

  if (grid[ny][nx] !== '#') result.push([key(ny * width + nx, direction), 1]);

  return result;
}

// Same graph walked backwards: undo a step (move to the cell behind) or a turn.
function backwardMoves(k) {
  const direction = k % 4;
  const position = (k - direction) / 4;
  const ny = Math.floor(position / width) - deltas[direction][0];
  const nx = (position % width) - deltas[direction][1];
  const result = [
    [key(position, (direction + 1) % 4), 1000],
    [key(position, (direction + 3) % 4), 1000],
  ];

  if (grid[ny][nx] !== '#') result.push([key(ny * width + nx, direction), 1]);

  return result;
}

const fromStart = dijkstra([key(start, 1)], forwardMoves);
const endStates = [0, 1, 2, 3].map((direction) => key(end, direction));
const best = Math.min(...endStates.filter((k) => fromStart.has(k)).map((k) => fromStart.get(k)));
const bestEndStates = endStates.filter((k) => fromStart.get(k) === best);
const toEnd = dijkstra(bestEndStates, backwardMoves);

const tiles = new Set();

fromStart.forEach((cost, k) => {
  if (toEnd.has(k) && cost + toEnd.get(k) === best) tiles.add(Math.floor(k / 4));
});

console.log(`Result: ${tiles.size}`);
