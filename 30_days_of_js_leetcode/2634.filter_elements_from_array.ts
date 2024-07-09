type Fn = (n: number, i: number) => any;

function filter(arr: number[], fn: Fn): number[] {
  const result = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    const number = arr[i];
    const bool = Boolean(fn(number, i));
    if (bool) result[result.length] = number;
  }

  return result;
}
