const fs = require('fs');

fs.readFile('day02-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  let safeReportsCount = 0;

  const rows = data.split('\n');

  rows.forEach((row) => {
    if (!row.trim()) {
      return;
    }

    const levels = row.split(' ');

    let direction = undefined;
    let safe = true;

    for (let index = 0; index < levels.length - 1; index++) {
      const level = parseInt(levels[index], 10);
      const nextLevel = parseInt(levels[index + 1], 10);

      // "Any two adjacent levels differ by at least one and at most three."

      if (Math.abs(level - nextLevel) > 3 || Math.abs(level - nextLevel) < 1) {
        safe = false;
        break;
      }

      // "The levels are either all increasing or all decreasing."

      if (direction === undefined) {
        direction = level > nextLevel ? 'decreasing' : 'increasing';
      } else if (level > nextLevel && direction === 'increasing') {
        safe = false;
        break;
      } else if (level < nextLevel && direction === 'decreasing') {
        safe = false;
        break;
      }
    }

    if (safe) {
      safeReportsCount += 1;
    }
  });

  console.log(`Safe reports: ${safeReportsCount}`);
});
