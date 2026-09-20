const fs = require('fs');

const stones = fs.readFileSync('day11-input.txt', 'utf8').trim().split(' ');
const BLINKS = 25;

// Counts stones per value, since equal stones always evolve identically.
let counts = new Map();

stones.forEach((stone) => counts.set(stone, (counts.get(stone) || 0) + 1));

for (let blink = 0; blink < BLINKS; blink++) {
  const next = new Map();
  const add = (stone, count) => next.set(stone, (next.get(stone) || 0) + count);

  counts.forEach((count, stone) => {
    if (stone === '0') {
      add('1', count);
    } else if (stone.length % 2 === 0) {
      add(String(Number(stone.slice(0, stone.length / 2))), count);
      add(String(Number(stone.slice(stone.length / 2))), count);
    } else {
      add(String(Number(stone) * 2024), count);
    }
  });

  counts = next;
}

let total = 0;

counts.forEach((count) => (total += count));

console.log(`Result: ${total}`);
