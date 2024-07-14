// Now write another function "fibsRec" which solves the same problem recursively. This can be done in just a couple of lines (or 1 if you're crazy, but don't consider either of these lengths a requirement... just get it done).

const fibsRec = (n, current = 0, space = 1, arr = []) => {
  if (n < 1) return arr;

  return fibsRec(n - 1, current + space, current, [...arr, current]);
};

// console.log(fibsRec(8));
// console.log(fibsRec(18));
// console.log(fibsRec(28));

const fibonacciRecursionShort = (n, current = 0, space = 1, arr = []) => (n < 1 ? arr : fibonacciRecursionShort(n - 1, current + space, current, [...arr, current]));

// others way

const fibsRec1 = (n) => {
  if (n <= 1) return n;
  return fibsRec1(n - 1) + fibsRec1(n - 2);
};

// or

const fibsRec2 = (n) => (n <= 1 ? n : fibsRec2(n - 1) + fibsRec2(n - 2));

module.exports = fibsRec;
