const fs = require('fs');

const rows = fs.readFileSync('day08-input.txt', 'utf8').trim().split('\n');
const height = rows.length;
const width = rows[0].length;
const antennas = {};

rows.forEach((row, y) =>
  row.split('').forEach((cell, x) => {
    if (cell === '.') return;

    (antennas[cell] ||= []).push([y, x]);
  })
);

const antinodes = new Set();

Object.values(antennas).forEach((positions) => {
  for (const [y1, x1] of positions) {
    for (const [y2, x2] of positions) {
      if (y1 === y2 && x1 === x2) continue;

      const y = y2 + (y2 - y1);
      const x = x2 + (x2 - x1);

      if (y >= 0 && y < height && x >= 0 && x < width) antinodes.add(`${y}|${x}`);
    }
  }
});

console.log(`Result: ${antinodes.size}`);
