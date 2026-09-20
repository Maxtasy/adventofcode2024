const fs = require('fs');

const MAX_CHEAT = 20;
const MIN_SAVING = 100;
const grid = fs.readFileSync('day20-input.txt', 'utf8').trim().split('\n');
const deltas = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

let start;

grid.forEach((row, y) => {
  const x = row.indexOf('S');

  if (x !== -1) start = [y, x];
});

// The track has no branches, so walking it yields every position in order.
const path = [start];
const visited = new Set([`${start[0]}|${start[1]}`]);

while (grid[path[path.length - 1][0]][path[path.length - 1][1]] !== 'E') {
  const [y, x] = path[path.length - 1];

  for (const [dy, dx] of deltas) {
    const k = `${y + dy}|${x + dx}`;

    if (grid[y + dy]?.[x + dx] !== '#' && grid[y + dy]?.[x + dx] !== undefined && !visited.has(k)) {
      visited.add(k);
      path.push([y + dy, x + dx]);

      break;
    }
  }
}

let cheats = 0;

for (let i = 0; i < path.length; i++) {
  for (let j = i + MIN_SAVING; j < path.length; j++) {
    const distance = Math.abs(path[i][0] - path[j][0]) + Math.abs(path[i][1] - path[j][1]);

    if (distance <= MAX_CHEAT && j - i - distance >= MIN_SAVING) cheats++;
  }
}

console.log(`Result: ${cheats}`);
