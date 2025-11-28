/**
 * @param {number[]} tokens
 * @param {number} power
 * @return {number}
 */

// var bagOfTokensScore = function (tokens, power, sorted = tokens.sort((a, b) => a - b), score = 0, first = 0, last = tokens.length - 1) {
//   if ((first === last && power < sorted[first]) || first > last) return score;

//   const lowestToken = sorted[first];

//   const highestToken = sorted[last];

//   if (power >= lowestToken) return bagOfTokensScore(tokens, power - lowestToken, sorted, score + 1, first + 1, last);

//   if (power < lowestToken && score > 0) return bagOfTokensScore(tokens, power + highestToken, sorted, score - 1, first, last - 1);

//   return score;
// };

var bagOfTokensScore = function (tokens, power) {
  tokens.sort((a, b) => a - b);
  let score = 0,
    maxScore = 0,
    left = 0,
    right = tokens.length - 1;
  while (left <= right) {
    if (power >= tokens[left]) (power -= tokens[left]), score++, left++, (maxScore = Math.max(maxScore, score));
    else if (score > 0) (power += tokens[right]), score--, right--;
    else break;
  }
  return maxScore;
};
