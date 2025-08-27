const fs = require('fs');

function isSafe(levels) {
  let direction = undefined;

  for (let index = 0; index < levels.length - 1; index++) {
    const level = parseInt(levels[index], 10);
    const nextLevel = parseInt(levels[index + 1], 10);

    // "Any two adjacent levels differ by at least one and at most three."

    if (Math.abs(level - nextLevel) > 3 || Math.abs(level - nextLevel) < 1) {
      return false;
    }

    // "The levels are either all increasing or all decreasing."

    if (direction === undefined) {
      direction = level > nextLevel ? 'decreasing' : 'increasing';
    } else if (level > nextLevel && direction === 'increasing') {
      return false;
    } else if (level < nextLevel && direction === 'decreasing') {
      return false;
    }
  }

  return true;
}

fs.readFile('day02-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  const rows = data.split('\n');

  let safeReportsCount = 0;

  rows.forEach((row) => {
    if (!row.trim()) {
      return;
    }

    const levels = row.split(' ');

    let found = false;

    for (let index = 0; index < levels.length; index++) {
      let damperedLevels;

      if (index === 0) {
        damperedLevels = [...levels.slice(index + 1)];
      } else {
        damperedLevels =
          index === levels.length - 1
            ? [...levels.slice(0, index)]
            : [...levels.slice(0, index), ...levels.slice(index + 1)];
      }

      if (isSafe(damperedLevels)) {
        safeReportsCount += 1;
        found = true;
        break;
      }
    }

    if (!found && isSafe(levels)) {
      safeReportsCount += 1;
    }
  });

  console.log(`Safe reports: ${safeReportsCount}`);
});
