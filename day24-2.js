const fs = require('fs');

const [, gatePart] = fs.readFileSync('day24-input.txt', 'utf8').trim().split('\n\n');
const gates = gatePart.split('\n').map((row) => {
  const [a, operation, b, , output] = row.split(' ');

  return { a, operation, b, output };
});

const lastOutput = gates
  .map((gate) => gate.output)
  .filter((wire) => wire.startsWith('z'))
  .sort()
  .pop();
const isInput = (wire) => wire.startsWith('x') || wire.startsWith('y');
const feeds = (wire, operation) => gates.some((gate) => gate.operation === operation && (gate.a === wire || gate.b === wire));

// The circuit is a ripple-carry adder. Every gate that breaks the adder's structure is a swapped output.
const wrong = new Set();

gates.forEach(({ a, operation, b, output }) => {
  const firstBit = [a, b].some((wire) => wire.endsWith('00')) && isInput(a);

  // Outputs z must come from XOR gates, except for the final carry.
  if (output.startsWith('z') && operation !== 'XOR' && output !== lastOutput) wrong.add(output);

  // XOR gates work either on x/y inputs or produce a z output.
  if (operation === 'XOR' && !isInput(a) && !output.startsWith('z')) wrong.add(output);

  // The XOR of x/y inputs has to feed another XOR (the sum), except for the first bit.
  if (operation === 'XOR' && isInput(a) && !firstBit && !feeds(output, 'XOR')) wrong.add(output);

  // AND gates have to feed an OR (the carry), except for the first bit.
  if (operation === 'AND' && !firstBit && !feeds(output, 'OR')) wrong.add(output);

  // The carry from an OR gate has to feed the next bit's XOR, except for the final carry.
  if (operation === 'OR' && output !== lastOutput && !feeds(output, 'XOR')) wrong.add(output);
});

console.log(`Result: ${[...wrong].sort().join(',')}`);
