console.log('Hello, World!');

// simple solution with loop
// Big O(n) time complexity - Big O(n) space complexity
const romanToInt = (s) => {
  let result = 0,
    current = 0,
    next = 1,
    l = s.length;
  const DATA = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000, IV: 4, IX: 9, XL: 40, XC: 90, CD: 400, CM: 900 };
  const ARR = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
  while (current < l) {
    const currentChar = s[current],
      nextChar = s[next];
    const isCombinationOfTwo = ARR.indexOf(currentChar) < ARR.indexOf(nextChar);
    if (isCombinationOfTwo) {
      result += DATA[currentChar + nextChar];
      current += 2;
      next += 2;
      continue;
    }
    result += DATA[currentChar];
    current++;
    next++;
  }
  return result;
};

// simple solution with recursion
// make it a little bit faster and a little bit less space consumption :)
// Big O(n) time complexity - Big O(n) space complexity

const romanToIntRec = (
  s,
  result = 0,
  current = 0,
  next = 1,
  l = s.length,
  DATA = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000, IV: 4, IX: 9, XL: 40, XC: 90, CD: 400, CM: 900 },
  ARR = ['I', 'V', 'X', 'L', 'C', 'D', 'M']
) => {
  if (current === l) return result;

  if (ARR.indexOf(s[current]) < ARR.indexOf(s[next])) return romanToIntRec(s, result + DATA[s[current] + s[next]], current + 2, next + 2, l, DATA, ARR);

  return romanToIntRec(s, result + DATA[s[current]], current + 1, next + 1, l, DATA, ARR);
};

// or even make it so short that no one could read or understand :)
const romanToIntRecShort = (
  s,
  result = 0,
  current = 0,
  next = 1,
  l = s.length,
  DATA = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000, IV: 4, IX: 9, XL: 40, XC: 90, CD: 400, CM: 900 },
  ARR = ['I', 'V', 'X', 'L', 'C', 'D', 'M']
) =>
  current === l
    ? result
    : ARR.indexOf(s[current]) < ARR.indexOf(s[next])
    ? romanToIntRecShort(s, result + DATA[s[current] + s[next]], current + 2, next + 2, l, DATA, ARR)
    : romanToIntRecShort(s, result + DATA[s[current]], current + 1, next + 1, l, DATA, ARR);
