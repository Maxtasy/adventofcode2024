const fs = require('fs');

fs.readFile('day05-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  const [firstPart, secondPart] = data.trim().split('\n\n');

  const pageOrderingRules = new Set(firstPart.split('\n'));

  const updates = secondPart.split('\n').map((row) => row.split(',').map((el) => parseInt(el, 10)));

  let sum = 0;

  updates.forEach((update) => {
    const sorted = [...update].sort((a, b) => {
      if (pageOrderingRules.has(`${a}|${b}`)) return -1;
      if (pageOrderingRules.has(`${b}|${a}`)) return 1;
      return 0;
    });

    if (update.some((val, i) => val !== sorted[i])) {
      sum += sorted[Math.floor(sorted.length / 2)];
    }
  });

  console.log(`Result: ${sum}`);
});
