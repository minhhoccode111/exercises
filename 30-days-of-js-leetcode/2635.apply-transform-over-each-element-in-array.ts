function map(arr: number[], fn: (n: number, i: number) => number): number[] {
  const resultArr = arr;
  for (let i = 0, len = arr.length; i < len; i++) {
    const currentNumber = arr[i];
    resultArr[i] = fn(currentNumber, i);
  }

  return resultArr;
}
