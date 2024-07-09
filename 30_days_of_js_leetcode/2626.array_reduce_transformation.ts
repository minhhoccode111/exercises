type Fn = (accum: number, curr: number) => number;

function reduce(nums: number[], fn: Fn, init: number): number {
  let accum = init;

  for (let i = 0, len = nums.length; i < len; i++) {
    const curr = nums[i];
    accum = fn(accum, curr);
  }
  return accum;
}
