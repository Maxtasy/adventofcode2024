const fs = require('fs');

const ROBOT_KEYPADS = 2;
const codes = fs.readFileSync('day21-input.txt', 'utf8').trim().split('\n');

const numericKeypad = { 7: [0, 0], 8: [0, 1], 9: [0, 2], 4: [1, 0], 5: [1, 1], 6: [1, 2], 1: [2, 0], 2: [2, 1], 3: [2, 2], 0: [3, 1], A: [3, 2] };
const numericGap = [3, 0];
const directionalKeypad = { '^': [0, 1], A: [0, 2], '<': [1, 0], v: [1, 1], '>': [1, 2] };
const directionalGap = [0, 0];

const cache = new Map();

// Fewest presses needed on the human's keypad to type `sequence` on a keypad that is `depth` robots away.
function sequenceCost(sequence, depth, keypad = directionalKeypad, gap = directionalGap) {
  if (depth === 0) return sequence.length;

  const cacheKey = `${sequence}|${depth}|${keypad === directionalKeypad}`;

  if (cache.has(cacheKey)) return cache.get(cacheKey);

  let cost = 0;
  let [y, x] = keypad.A;

  for (const char of sequence) {
    const [ty, tx] = keypad[char];
    const vertical = (ty > y ? 'v' : '^').repeat(Math.abs(ty - y));
    const horizontal = (tx > x ? '>' : '<').repeat(Math.abs(tx - x));
    const options = [];

    // Moving horizontally first must not cross the gap, and vice versa.
    if (!(y === gap[0] && tx === gap[1])) options.push(horizontal + vertical + 'A');
    if (!(ty === gap[0] && x === gap[1])) options.push(vertical + horizontal + 'A');

    cost += Math.min(...options.map((option) => sequenceCost(option, depth - 1)));

    [y, x] = [ty, tx];
  }

  cache.set(cacheKey, cost);

  return cost;
}

const complexity = codes.reduce(
  (sum, code) => sum + sequenceCost(code, ROBOT_KEYPADS + 1, numericKeypad, numericGap) * parseInt(code, 10),
  0
);

console.log(`Result: ${complexity}`);
