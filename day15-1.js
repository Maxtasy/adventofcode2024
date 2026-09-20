const fs = require('fs');

const [mapPart, movesPart] = fs.readFileSync('day15-input.txt', 'utf8').trim().split('\n\n');
const grid = mapPart.split('\n').map((row) => row.split(''));
const moves = movesPart.replaceAll('\n', '').split('');
const deltas = { '^': [-1, 0], '>': [0, 1], v: [1, 0], '<': [0, -1] };

let robotY;
let robotX;

grid.forEach((row, y) =>
  row.forEach((cell, x) => {
    if (cell === '@') {
      robotY = y;
      robotX = x;
    }
  })
);

moves.forEach((move) => {
  const [dy, dx] = deltas[move];

  // Find the first free cell behind a chain of boxes.
  let y = robotY + dy;
  let x = robotX + dx;

  while (grid[y][x] === 'O') {
    y += dy;
    x += dx;
  }

  if (grid[y][x] === '#') return;

  // Moving the whole chain equals putting a box at the free cell and moving the robot one step.
  if (y !== robotY + dy || x !== robotX + dx) grid[y][x] = 'O';

  grid[robotY][robotX] = '.';
  robotY += dy;
  robotX += dx;
  grid[robotY][robotX] = '@';
});

let sum = 0;

grid.forEach((row, y) =>
  row.forEach((cell, x) => {
    if (cell === 'O') sum += 100 * y + x;
  })
);

console.log(`Result: ${sum}`);
