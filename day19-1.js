const fs = require('fs');

const [towelPart, designPart] = fs.readFileSync('day19-input.txt', 'utf8').trim().split('\n\n');
const towels = towelPart.split(', ');
const designs = designPart.split('\n');

function countWays(design) {
  // ways[i] is the number of ways to build the first i characters of the design.
  const ways = new Array(design.length + 1).fill(0);

  ways[0] = 1;

  for (let i = 1; i <= design.length; i++) {
    for (const towel of towels) {
      if (towel.length <= i && ways[i - towel.length] > 0 && design.endsWith(towel, i)) {
        ways[i] += ways[i - towel.length];
      }
    }
  }

  return ways[design.length];
}

console.log(`Result: ${designs.filter((design) => countWays(design) > 0).length}`);
