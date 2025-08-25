const fs = require('fs');

fs.readFile('day01-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  let similarityScore = 0;

  const rows = data.split('\n');

  let leftValues = [];
  let rightValues = [];

  rows.forEach((rows) => {
    if (!rows.trim()) {
      return;
    }

    const [leftString, rightString] = rows.split('  ');

    leftValues.push(parseInt(leftString, 10));
    rightValues.push(parseInt(rightString, 10));
  });

  leftValues.forEach((value) => {
    const occurencesInRightValues = rightValues.reduce((acc, number) => {
      return number === value ? (acc += 1) : acc;
    }, 0);

    similarityScore += value * occurencesInRightValues;
  });

  console.log(`Similarity score: ${similarityScore}`);
});
