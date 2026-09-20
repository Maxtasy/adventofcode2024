const fs = require('fs');

const digits = fs.readFileSync('day09-input.txt', 'utf8').trim().split('').map(Number);
const files = [];
const gaps = [];
let position = 0;

digits.forEach((digit, index) => {
  if (index % 2 === 0) {
    files.push({ id: index / 2, position, size: digit });
  } else {
    gaps.push({ position, size: digit });
  }

  position += digit;
});

for (let i = files.length - 1; i >= 0; i--) {
  const file = files[i];
  const gap = gaps.find((g) => g.position < file.position && g.size >= file.size);

  if (gap) {
    file.position = gap.position;
    gap.position += file.size;
    gap.size -= file.size;
  }
}

const checksum = files.reduce((sum, { id, position, size }) => {
  for (let i = 0; i < size; i++) sum += id * (position + i);

  return sum;
}, 0);

console.log(`Result: ${checksum}`);
