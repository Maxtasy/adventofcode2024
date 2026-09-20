const fs = require('fs');

const grid = fs.readFileSync('day10-input.txt', 'utf8').trim().split('\n').map((row) => row.split('').map(Number));
const deltas = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function findTrailEnds(y, x, ends) {
  if (grid[y][x] === 9) {
    ends.add(`${y}|${x}`);

    return;
  }

  deltas.forEach(([dy, dx]) => {
    if (grid[y + dy]?.[x + dx] === grid[y][x] + 1) findTrailEnds(y + dy, x + dx, ends);
  });
}

let sum = 0;

grid.forEach((row, y) =>
  row.forEach((height, x) => {
    if (height !== 0) return;

    const ends = new Set();

    findTrailEnds(y, x, ends);
    sum += ends.size;
  })
);

console.log(`Result: ${sum}`);
