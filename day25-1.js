const fs = require('fs');

const schematics = fs
  .readFileSync('day25-input.txt', 'utf8')
  .trim()
  .split('\n\n')
  .map((block) => block.split('\n'));
const locks = [];
const keys = [];

schematics.forEach((rows) => {
  const heights = [];

  for (let x = 0; x < rows[0].length; x++) {
    heights.push(rows.filter((row) => row[x] === '#').length - 1);
  }

  (rows[0] === '#####' ? locks : keys).push(heights);
});

let fits = 0;

locks.forEach((lock) => {
  keys.forEach((key) => {
    if (lock.every((height, index) => height + key[index] <= 5)) fits++;
  });
});

console.log(`Result: ${fits}`);
