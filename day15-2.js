const fs = require('fs');

const [mapPart, movesPart] = fs.readFileSync('day15-input.txt', 'utf8').trim().split('\n\n');
const widen = { '#': '##', O: '[]', '.': '..', '@': '@.' };
const grid = mapPart.split('\n').map((row) =>
  row
    .split('')
    .map((cell) => widen[cell])
    .join('')
    .split('')
);
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

// Collects all cells that get pushed by moving into (y, x). Returns null if something is blocked.
function collectPushed(y, x, dy, dx) {
  const pushed = new Map();
  const queue = [[y, x]];

  while (queue.length > 0) {
    const [cy, cx] = queue.shift();
    const cell = grid[cy][cx];

    if (cell === '#') return null;
    if (cell === '.') continue;
    if (pushed.has(`${cy}|${cx}`)) continue;

    pushed.set(`${cy}|${cx}`, [cy, cx]);

    // A box consists of two cells, both have to move.
    if (cell === '[') queue.push([cy, cx + 1]);
    if (cell === ']') queue.push([cy, cx - 1]);

    queue.push([cy + dy, cx + dx]);
  }

  return [...pushed.values()];
}

moves.forEach((move) => {
  const [dy, dx] = deltas[move];
  const pushed = collectPushed(robotY + dy, robotX + dx, dy, dx);

  if (pushed === null) return;

  const values = pushed.map(([y, x]) => grid[y][x]);

  pushed.forEach(([y, x]) => (grid[y][x] = '.'));
  pushed.forEach(([y, x], index) => (grid[y + dy][x + dx] = values[index]));

  grid[robotY][robotX] = '.';
  robotY += dy;
  robotX += dx;
  grid[robotY][robotX] = '@';
});

let sum = 0;

grid.forEach((row, y) =>
  row.forEach((cell, x) => {
    if (cell === '[') sum += 100 * y + x;
  })
);

console.log(`Result: ${sum}`);
