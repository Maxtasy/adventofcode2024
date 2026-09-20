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
    let corners = 0;

    visited.add(`${startY}|${startX}`);

    while (stack.length > 0) {
      const [y, x] = stack.pop();

      area++;

      deltas.forEach(([dy, dx]) => {
        const ny = y + dy;
        const nx = x + dx;

        if (grid[ny]?.[nx] === plant && !visited.has(`${ny}|${nx}`)) {
          visited.add(`${ny}|${nx}`);
          stack.push([ny, nx]);
        }
      });

      // The number of sides equals the number of corners. Check each of the four corners of the cell.
      for (let i = 0; i < 4; i++) {
        const [dy1, dx1] = deltas[i];
        const [dy2, dx2] = deltas[(i + 1) % 4];
        const side1 = grid[y + dy1]?.[x + dx1] === plant;
        const side2 = grid[y + dy2]?.[x + dx2] === plant;
        const diagonal = grid[y + dy1 + dy2]?.[x + dx1 + dx2] === plant;

        // Outer corner: both neighbours differ. Inner corner: both neighbours match, but the diagonal differs.
        if ((!side1 && !side2) || (side1 && side2 && !diagonal)) corners++;
      }
    }

    price += area * corners;
  }
});

console.log(`Result: ${price}`);
