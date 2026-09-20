const fs = require('fs');

const [, programPart] = fs.readFileSync('day17-input.txt', 'utf8').trim().split('\n\n');
const program = programPart.match(/\d+/g).map(Number);

function run(a, b, c) {
  const output = [];
  let pointer = 0;

  const combo = (operand) => [0n, 1n, 2n, 3n, a, b, c][operand];

  while (pointer < program.length) {
    const opcode = program[pointer];
    const operand = program[pointer + 1];

    pointer += 2;

    switch (opcode) {
      case 0:
        a = a >> combo(operand);
        break;
      case 1:
        b = b ^ BigInt(operand);
        break;
      case 2:
        b = combo(operand) % 8n;
        break;
      case 3:
        if (a !== 0n) pointer = operand;
        break;
      case 4:
        b = b ^ c;
        break;
      case 5:
        output.push(Number(combo(operand) % 8n));
        break;
      case 6:
        b = a >> combo(operand);
        break;
      case 7:
        c = a >> combo(operand);
        break;
    }
  }

  return output;
}

// The program consumes register A three bits per loop, so build A from the last output backwards.
// Each candidate is extended by three bits and has to reproduce the tail of the program.
function search(a, index) {
  if (index < 0) return a;

  for (let bits = 0n; bits < 8n; bits++) {
    const candidate = a * 8n + bits;
    const output = run(candidate, 0n, 0n);

    if (output.join(',') === program.slice(index).join(',')) {
      const result = search(candidate, index - 1);

      if (result !== null) return result;
    }
  }

  return null;
}

console.log(`Result: ${search(0n, program.length - 1)}`);
