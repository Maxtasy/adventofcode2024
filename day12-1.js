const fs = require('fs');

const grid = fs.readFileSync('day12-input.txt', 'utf8').trim().split('\n');
const deltas = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
const visited = new Set();

let price = 0;

grid.forEach((row, startY) => {
  for (let startX = 0; startX < row.length; startX++) {
    if (visited.has(`${startY}|${startX}`)) continue;

    const plant = grid[startY][startX];
    const stack = [[startY, startX]];
    let area = 0;
    let perimeter = 0;

    visited.add(`${startY}|${startX}`);

    while (stack.length > 0) {
      const [y, x] = stack.pop();

      area++;

      deltas.forEach(([dy, dx]) => {
        const ny = y + dy;
        const nx = x + dx;

        if (grid[ny]?.[nx] !== plant) {
          perimeter++;
        } else if (!visited.has(`${ny}|${nx}`)) {
          visited.add(`${ny}|${nx}`);
          stack.push([ny, nx]);
        }
      });
    }

    price += area * perimeter;
  }
});

console.log(`Result: ${price}`);
