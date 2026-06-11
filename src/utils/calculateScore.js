export function calculateScore(fundName, query) {

  const words = query
    .toLowerCase()
    .trim()
    .split(/\s+/);

  let score = 0;

  const name = fundName.toLowerCase();

  for (let word of words) {
    if (name.includes(word)) {
      score++;
    }
  }

  return score;
}