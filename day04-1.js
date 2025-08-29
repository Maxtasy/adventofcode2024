const fs = require('fs');

fs.readFile('day04-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  const WORDS_TO_FIND = ['XMAS', 'SAMX'];

  let wordCount = 0;

  const rows = data.trim().split('\n');

  rows.forEach((row, verticalIndex) => {
    const chars = row.split('');

    chars.forEach((char, horizontalIndex) => {
      // Horizontal check
      if (horizontalIndex < row.length - WORDS_TO_FIND.length - 1) {
        const str =
          char +
          chars[horizontalIndex + 1] +
          chars[horizontalIndex + 2] +
          chars[horizontalIndex + 3];

        if (WORDS_TO_FIND.includes(str)) wordCount++;
      }

      // Vertical check
      if (verticalIndex < rows.length - WORDS_TO_FIND.length - 1) {
        const str =
          char +
          rows[verticalIndex + 1][horizontalIndex] +
          rows[verticalIndex + 2][horizontalIndex] +
          rows[verticalIndex + 3][horizontalIndex];

        if (WORDS_TO_FIND.includes(str)) wordCount++;
      }

      // Diagonal checks
      if (
        verticalIndex < rows.length - WORDS_TO_FIND.length - 1 &&
        horizontalIndex < row.length - WORDS_TO_FIND.length - 1
      ) {
        const str =
          char +
          rows[verticalIndex + 1][horizontalIndex + 1] +
          rows[verticalIndex + 2][horizontalIndex + 2] +
          rows[verticalIndex + 3][horizontalIndex + 3];

        if (WORDS_TO_FIND.includes(str)) wordCount++;
      }

      if (
        verticalIndex < rows.length - WORDS_TO_FIND.length - 1 &&
        horizontalIndex > WORDS_TO_FIND.length - 1
      ) {
        const str =
          char +
          rows[verticalIndex + 1][horizontalIndex - 1] +
          rows[verticalIndex + 2][horizontalIndex - 2] +
          rows[verticalIndex + 3][horizontalIndex - 3];

        if (WORDS_TO_FIND.includes(str)) wordCount++;
      }
    });
  });

  console.log(`Word count: ${wordCount}`);
});
