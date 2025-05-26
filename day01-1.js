const fs = require('fs');

fs.readFile('day01-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  let totalDistance = 0;

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

  while (leftValues.length > 0 && rightValues.length > 0) {
    // Find smallest number from the left row and right row.
    const smallestLeftValueIndex = leftValues.findIndex(
      (value) => value === Math.min(...leftValues)
    );
    const smallestRightValueIndex = rightValues.findIndex(
      (value) => value === Math.min(...rightValues)
    );

    // Calculate their distance and add it to the total distance.
    const distance = Math.abs(
      leftValues[smallestLeftValueIndex] - rightValues[smallestRightValueIndex]
    );
    totalDistance += distance;

    // Remove the smallest values from both arrays.
    leftValues = leftValues.filter((_, index) => index !== smallestLeftValueIndex);
    rightValues = rightValues.filter((_, index) => index !== smallestRightValueIndex);
  }

  console.log(`Total distance: ${totalDistance}`);
});
