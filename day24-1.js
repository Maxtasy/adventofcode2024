const fs = require('fs');

const [wirePart, gatePart] = fs.readFileSync('day24-input.txt', 'utf8').trim().split('\n\n');
const values = new Map();
const gates = new Map();

wirePart.split('\n').forEach((row) => {
  const [name, value] = row.split(': ');

  values.set(name, Number(value));
});

gatePart.split('\n').forEach((row) => {
  const [a, operation, b, , output] = row.split(' ');

  gates.set(output, { a, operation, b });
});

function getValue(wire) {
  if (values.has(wire)) return values.get(wire);

  const { a, operation, b } = gates.get(wire);
  const left = getValue(a);
  const right = getValue(b);
  const value = operation === 'AND' ? left & right : operation === 'OR' ? left | right : left ^ right;

  values.set(wire, value);

  return value;
}

const outputWires = [...gates.keys()].filter((wire) => wire.startsWith('z')).sort().reverse();
const binary = outputWires.map((wire) => getValue(wire)).join('');

console.log(`Result: ${BigInt(`0b${binary}`)}`);
