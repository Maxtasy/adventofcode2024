const fs = require('fs');

const grid = fs.readFileSync('day10-input.txt', 'utf8').trim().split('\n').map((row) => row.split('').map(Number));
const deltas = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function countTrails(y, x) {
  if (grid[y][x] === 9) return 1;

  return deltas.reduce(
    (sum, [dy, dx]) =>
      grid[y + dy]?.[x + dx] === grid[y][x] + 1 ? sum + countTrails(y + dy, x + dx) : sum,
    0
  );
}

let sum = 0;

grid.forEach((row, y) =>
  row.forEach((height, x) => {
    if (height === 0) sum += countTrails(y, x);
  })
);

console.log(`Result: ${sum}`);
