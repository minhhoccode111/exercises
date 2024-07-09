type MultiDimensionalArray = (number | MultiDimensionalArray)[];

var flat = function (
  arr: MultiDimensionalArray,
  n: number,
): MultiDimensionalArray {
  if (n === 0) return arr;

  const result: any[] = [];

  for (const item of arr) {
    if (Array.isArray(item))
      result.push(...flat(item as MultiDimensionalArray, n - 1));
    else result.push(item);
  }

  return result;
};
