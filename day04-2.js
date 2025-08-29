const fs = require('fs');

fs.readFile('day04-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  const WORDS_TO_FIND = ['MAS', 'SAM'];

  let crossCount = 0;

  const rows = data.trim().split('\n');

  rows.forEach((row, verticalIndex) => {
    const chars = row.split('');

    chars.forEach((char, horizontalIndex) => {
      if (
        horizontalIndex > 0 &&
        horizontalIndex < row.length - 1 &&
        verticalIndex > 0 &&
        verticalIndex < rows.length - 1
      ) {
        const str1 =
          rows[verticalIndex - 1][horizontalIndex - 1] +
          char +
          rows[verticalIndex + 1][horizontalIndex + 1];
        const str2 =
          rows[verticalIndex - 1][horizontalIndex + 1] +
          char +
          rows[verticalIndex + 1][horizontalIndex - 1];

        if (WORDS_TO_FIND.includes(str1) && WORDS_TO_FIND.includes(str2)) {
          crossCount++;
        }
      }
    });
  });

  console.log(`Cross count: ${crossCount}`);
});
