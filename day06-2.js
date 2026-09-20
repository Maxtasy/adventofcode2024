const fs = require('fs');

const grid = fs.readFileSync('day06-input.txt', 'utf8').trim().split('\n').map((row) => row.split(''));
const height = grid.length;
const width = grid[0].length;
const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

let startY;
let startX;

grid.forEach((row, y) =>
  row.forEach((cell, x) => {
    if (cell === '^') {
      startY = y;
      startX = x;
    }
  })
);

// Walks the guard. Returns the set of visited cells, or null if the guard is stuck in a loop.
function walk(obstacle) {
  let y = startY;
  let x = startX;
  let direction = 0;
  const states = new Set();
  const cells = new Set();

  while (true) {
    const state = (y * width + x) * 4 + direction;

    if (states.has(state)) return null;

    states.add(state);
    cells.add(y * width + x);

    const nextY = y + directions[direction][0];
    const nextX = x + directions[direction][1];

    if (nextY < 0 || nextX < 0 || nextY >= height || nextX >= width) return cells;

    if (grid[nextY][nextX] === '#' || nextY * width + nextX === obstacle) {
      direction = (direction + 1) % 4;
    } else {
      y = nextY;
      x = nextX;
    }
  }
}

const visited = walk(-1);
let loopCount = 0;

visited.forEach((cell) => {
  if (cell !== startY * width + startX && walk(cell) === null) loopCount++;
});

console.log(`Result: ${loopCount}`);
