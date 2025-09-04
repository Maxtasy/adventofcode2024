const fs = require('fs');

const GUARD_CHARS = ['^', '>', 'v', '<'];
const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
let nextMoveDeltas;

fs.readFile('day06-input.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);

    return;
  }

  const rows = data.trim().split('\n');
  const height = rows.length;
  const width = rows[0].length;

  let guardPosition;
  let directionIndex;
  let visitedPositions = [];

  let found = false;

  for (let y = 0; y < rows.length; y++) {
    const row = rows[y];

    for (let x = 0; x < row.length; x++) {
      const cell = row[x];

      directionIndex = GUARD_CHARS.findIndex((char) => char === cell);

      if (directionIndex !== -1) {
        nextMoveDeltas = directions[directionIndex];
        guardPosition = {
          x,
          y,
        };

        found = true;
        visitedPositions.push(`${y}|${x}`);

        break;
      }
    }

    if (found) break;
  }

  while (
    guardPosition.x > -1 &&
    guardPosition.y > -1 &&
    guardPosition.x < width - 1 &&
    guardPosition.y < height - 1
  ) {
    let nextDesiredPositionX = guardPosition.x + nextMoveDeltas[1];
    let nextDesiredPositionY = guardPosition.y + nextMoveDeltas[0];

    if (nextDesiredPositionX < 0) break;
    if (nextDesiredPositionX > width - 1) break;
    if (nextDesiredPositionY < 0) break;
    if (nextDesiredPositionX > height - 1) break;

    while (rows[nextDesiredPositionY][nextDesiredPositionX] === '#') {
      directionIndex = (directionIndex + 1) % directions.length;
      nextMoveDeltas = directions[directionIndex];

      nextDesiredPositionX = guardPosition.x + nextMoveDeltas[1];
      nextDesiredPositionY = guardPosition.y + nextMoveDeltas[0];
    }

    guardPosition.x = nextDesiredPositionX;
    guardPosition.y = nextDesiredPositionY;

    visitedPositions.push(`${guardPosition.y}|${guardPosition.x}`);
  }

  console.log(`Result: ${new Set(visitedPositions).size}`);
});
