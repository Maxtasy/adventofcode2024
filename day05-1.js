const fs = require('fs');

fs.readFile('day05-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  const [firstPart, secondPart] = data.trim().split('\n\n');

  const pageOrderingRules = {};

  firstPart.split('\n').forEach((row) => {
    const [number, before] = row.split('|').map((el) => parseInt(el, 10));

    if (pageOrderingRules[number]) {
      pageOrderingRules[number].before.push(before);
    } else {
      pageOrderingRules[number] = {
        before: [before],
      };
    }
  });

  const updates = secondPart.split('\n').map((row) => row.split(',').map((el) => parseInt(el, 10)));

  let sum = 0;

  updates.forEach((update) => {
    let valid = true;
    const encounteredNumbers = [];

    for (let index = 0; index < update.length; index++) {
      const number = update[index];

      if (pageOrderingRules[`${number}`]) {
        const { before } = pageOrderingRules[`${number}`];

        if (before.some((el) => encounteredNumbers.includes(el))) {
          valid = false;
          break;
        }
      }

      encounteredNumbers.push(number);
    }

    if (valid) sum += encounteredNumbers[Math.floor(encounteredNumbers.length / 2)];
  });

  console.log(`Result: ${sum}`);
});
