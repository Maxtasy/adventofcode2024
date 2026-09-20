const fs = require('fs');

const WIDTH = 101;
const HEIGHT = 103;
const SECONDS = 100;
const robots = fs
  .readFileSync('day14-input.txt', 'utf8')
  .trim()
  .split('\n')
  .map((row) => row.match(/-?\d+/g).map(Number));

const quadrants = [0, 0, 0, 0];
const middleX = (WIDTH - 1) / 2;
const middleY = (HEIGHT - 1) / 2;

robots.forEach(([x, y, vx, vy]) => {
  const finalX = (((x + vx * SECONDS) % WIDTH) + WIDTH) % WIDTH;
  const finalY = (((y + vy * SECONDS) % HEIGHT) + HEIGHT) % HEIGHT;

  if (finalX === middleX || finalY === middleY) return;

  quadrants[(finalX > middleX ? 1 : 0) + (finalY > middleY ? 2 : 0)]++;
});

console.log(`Result: ${quadrants.reduce((product, count) => product * count, 1)}`);
