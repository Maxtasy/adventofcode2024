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

const totals = new Map();

secrets.forEach((secret) => {
  const seen = new Set();
  const changes = [];
  let price = secret % 10;

  for (let i = 0; i < 2000; i++) {
    secret = nextSecret(secret);

    const nextPrice = secret % 10;

    changes.push(nextPrice - price);
    price = nextPrice;

    if (changes.length >= 4) {
      const sequence = changes.slice(-4).join(',');

      // The monkey sells at the first occurrence of a sequence only.
      if (!seen.has(sequence)) {
        seen.add(sequence);
        totals.set(sequence, (totals.get(sequence) || 0) + price);
      }
    }
  }
});

console.log(`Result: ${Math.max(...totals.values())}`);
