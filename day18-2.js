const fs = require('fs');

const SIZE = 71;
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

function canReachExit(byteCount) {
  const blocked = new Set(bytes.slice(0, byteCount).map(([x, y]) => `${x}|${y}`));
  const seen = new Set(['0|0']);
  const stack = [[0, 0]];

  while (stack.length > 0) {
    const [x, y] = stack.pop();

    if (x === SIZE - 1 && y === SIZE - 1) return true;

    for (const [dy, dx] of deltas) {
      const nx = x + dx;
      const ny = y + dy;
      const k = `${nx}|${ny}`;

      if (nx < 0 || ny < 0 || nx >= SIZE || ny >= SIZE || blocked.has(k) || seen.has(k)) continue;

      seen.add(k);
      stack.push([nx, ny]);
    }
  }

  return false;
}

// Binary search for the smallest number of fallen bytes that blocks the path.
let low = 0;
let high = bytes.length;

while (low < high) {
  const middle = Math.floor((low + high) / 2);

  if (canReachExit(middle)) {
    low = middle + 1;
  } else {
    high = middle;
  }
}

console.log(`Result: ${bytes[low - 1].join(',')}`);
