const fs = require('fs');

fs.readFile('day03-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  // Remove all parts from the input that start with "don't()" and end with "do()"
  // Also remove the last part that starts with "don't()" and no more "do()" comes after
  const cleanedData = data.replaceAll(/(don't\(\).*?do\(\)|don't\(\).*?$)/gs, '');

  const regexp = /mul\(\d+,\d+\)/g;

  const validMuls = [...cleanedData.matchAll(regexp)].map((entry) => entry[0]);

  const result = validMuls.reduce((acc, item) => {
    const [num1, num2] = item.replace('mul(', '').replace(')', '').split(',');

    return (acc += parseInt(num1, 10) * parseInt(num2, 10));
  }, 0);

  console.log(`Result: ${result}`);
});
