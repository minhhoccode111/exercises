// Now write another function "fibsRec" which solves the same problem recursively. This can be done in just a couple of lines (or 1 if you're crazy, but don't consider either of these lengths a requirement... just get it done).

const fibsRec = (n, current = 0, space = 1, arr = []) => {
  if (n < 1) return arr;

  return fibsRec(n - 1, current + space, current, [...arr, current]);
};

console.log(fibsRec(8));
console.log(fibsRec(18));
console.log(fibsRec(28));

const fibonacciRecursionShort = (n, current = 0, space = 1, arr = []) => (n < 1 ? arr : shorter(n - 1, current + space, current, [...arr, current]));
