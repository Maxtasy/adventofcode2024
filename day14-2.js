const fs = require('fs');

const WIDTH = 101;
const HEIGHT = 103;
const robots = fs
  .readFileSync('day14-input.txt', 'utf8')
  .trim()
  .split('\n')
  .map((row) => row.match(/-?\d+/g).map(Number));

// Positions repeat after WIDTH * HEIGHT seconds. The tree is the first moment where all robots
// stand on distinct tiles.
let result;

for (let seconds = 1; seconds <= WIDTH * HEIGHT; seconds++) {
  const positions = new Set(
    robots.map(([x, y, vx, vy]) => {
      const finalX = (((x + vx * seconds) % WIDTH) + WIDTH) % WIDTH;
      const finalY = (((y + vy * seconds) % HEIGHT) + HEIGHT) % HEIGHT;

      return `${finalX}|${finalY}`;
    })
  );

  if (positions.size === robots.length) {
    result = seconds;

    break;
  }
}

console.log(`Result: ${result}`);
