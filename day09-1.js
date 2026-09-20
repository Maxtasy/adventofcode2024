const fs = require('fs');

const digits = fs.readFileSync('day09-input.txt', 'utf8').trim().split('').map(Number);
const blocks = [];

digits.forEach((digit, index) => {
  const value = index % 2 === 0 ? index / 2 : -1;

  for (let i = 0; i < digit; i++) blocks.push(value);
});

let left = 0;
let right = blocks.length - 1;

while (left < right) {
  if (blocks[left] !== -1) {
    left++;
  } else if (blocks[right] === -1) {
    right--;
  } else {
    blocks[left] = blocks[right];
    blocks[right] = -1;
  }
}

const checksum = blocks.reduce((sum, value, index) => (value === -1 ? sum : sum + value * index), 0);

console.log(`Result: ${checksum}`);
