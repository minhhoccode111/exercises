type Fn = (...params: number[]) => number;

function memoize(fn: Fn): Fn {
  const map = new Map();
  return function (...args) {
    const key = args.toString();
    if (map.has(key)) return map.get(key);
    const value = fn(...args);
    map.set(key, value);
    return value;
  };
}
