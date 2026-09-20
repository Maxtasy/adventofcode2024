const fs = require('fs');

const equations = fs
  .readFileSync('day07-input.txt', 'utf8')
  .trim()
  .split('\n')
  .map((row) => {
    const [target, numbers] = row.split(': ');

    return { target: parseInt(target, 10), numbers: numbers.split(' ').map(Number) };
  });

function canSolve(target, numbers, index, current) {
  if (current > target) return false;
  if (index === numbers.length) return current === target;

  return (
    canSolve(target, numbers, index + 1, current + numbers[index]) ||
    canSolve(target, numbers, index + 1, current * numbers[index])
  );
}

const result = equations.reduce(
  (sum, { target, numbers }) => (canSolve(target, numbers, 1, numbers[0]) ? sum + target : sum),
  0
);

console.log(`Result: ${result}`);
