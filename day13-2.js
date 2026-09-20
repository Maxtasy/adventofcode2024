const fs = require('fs');

const OFFSET = 10000000000000;
const machines = fs
  .readFileSync('day13-input.txt', 'utf8')
  .trim()
  .split('\n\n')
  .map((block) => block.match(/\d+/g).map(Number));

let tokens = 0;

machines.forEach(([ax, ay, bx, by, px, py]) => {
  px += OFFSET;
  py += OFFSET;

  // Solve a * A + b * B = P using Cramer's rule.
  const determinant = ax * by - ay * bx;
  const a = (px * by - py * bx) / determinant;
  const b = (ax * py - ay * px) / determinant;

  if (Number.isInteger(a) && Number.isInteger(b) && a >= 0 && b >= 0) tokens += 3 * a + b;
});

console.log(`Result: ${tokens}`);
