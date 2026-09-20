const fs = require('fs');

const MODULO = 16777216;
const secrets = fs.readFileSync('day22-input.txt', 'utf8').trim().split('\n').map(Number);

// Every intermediate value stays below 2^24 before the XOR, so 32-bit XOR is safe.
function nextSecret(secret) {
  secret = ((secret * 64) % MODULO) ^ secret;
  secret = Math.floor(secret / 32) ^ secret;
  secret = ((secret * 2048) % MODULO) ^ secret;

  return secret;
}

let sum = 0;

secrets.forEach((secret) => {
  for (let i = 0; i < 2000; i++) secret = nextSecret(secret);

  sum += secret;
});

console.log(`Result: ${sum}`);
