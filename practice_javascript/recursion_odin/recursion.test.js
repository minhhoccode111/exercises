const mergeSort = require('./assignment-2/merge-sort');
const fibs = require('./assignment-1/fibs');
const fibsRec = require('./assignment-1/fibsRec');

describe('mergeSort', () => {
  it('should return an empty array when given an empty array', () => {
    const arr = [];
    const sortedArr = mergeSort(arr);
    expect(sortedArr).toEqual([]);
  });

  it('should return the same array when given a single-element array', () => {
    const arr = [42];
    const sortedArr = mergeSort(arr);
    expect(sortedArr).toEqual([42]);
  });

  it('should sort an array of positive integers in ascending order', () => {
    const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
    const sortedArr = mergeSort(arr);
    expect(sortedArr).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]);
  });

  it('should sort an array of negative integers in ascending order', () => {
    const arr = [-3, -1, -4, -1, -5, -9, -2, -6, -5, -3, -5];
    const sortedArr = mergeSort(arr);
    expect(sortedArr).toEqual([-9, -6, -5, -5, -5, -4, -3, -3, -2, -1, -1]);
  });

  it('should sort an array of mixed positive and negative integers in ascending order', () => {
    const arr = [3, -1, 4, -1, 5, -9, 2, 6, -5, 3, -5];
    const sortedArr = mergeSort(arr);
    expect(sortedArr).toEqual([-9, -5, -5, -1, -1, 2, 3, 3, 4, 5, 6]);
  });

  it('should sort an array of positive floating-point numbers in ascending order', () => {
    const arr = [3.14, 1.618, 2.718, 0.577, 1.414];
    const sortedArr = mergeSort(arr);
    expect(sortedArr).toEqual([0.577, 1.414, 1.618, 2.718, 3.14]);
  });

  it('should sort an array of negative floating-point numbers in ascending order', () => {
    const arr = [-3.14, -1.618, -2.718, -0.577, -1.414];
    const sortedArr = mergeSort(arr);
    expect(sortedArr).toEqual([-3.14, -2.718, -1.618, -1.414, -0.577]);
  });

  it('should sort an array of mixed floating-point numbers in ascending order', () => {
    const arr = [3.14, -1.618, 2.718, -0.577, 1.414];
    const sortedArr = mergeSort(arr);
    expect(sortedArr).toEqual([-1.618, -0.577, 1.414, 2.718, 3.14]);
  });

  it('should sort an array of strings in ascending order', () => {
    const arr = ['apple', 'banana', 'cherry', 'date', 'fig'];
    const sortedArr = mergeSort(arr);
    expect(sortedArr).toEqual(['apple', 'banana', 'cherry', 'date', 'fig']);
  });

  it('should sort an array of strings with different lengths in ascending order', () => {
    const arr = ['grape', 'pear', 'kiwi', 'plum', 'apricot'];
    const sortedArr = mergeSort(arr);
    expect(sortedArr).toEqual(['apricot', 'grape', 'kiwi', 'pear', 'plum']);
  });
});

describe('fibs', () => {
  it('should return an empty array for 0', () => {
    expect(fibs(0)).toEqual([]);
  });

  it('should return [0] for 1', () => {
    expect(fibs(1)).toEqual([0]);
  });

  it('should return [0, 1] for 2', () => {
    expect(fibs(2)).toEqual([0, 1]);
  });

  it('should return [0, 1, 1, 2] for 4', () => {
    expect(fibs(4)).toEqual([0, 1, 1, 2]);
  });

  it('should return [0, 1, 1, 2, 3, 5, 8, 13] for 8', () => {
    expect(fibs(8)).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
  });

  it('should return an empty array for a negative number', () => {
    expect(fibs(-5)).toEqual([]);
  });

  it('should return [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55] for 11', () => {
    expect(fibs(11)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });

  it('should return an empty array for a string input', () => {
    expect(fibs('invalid')).toEqual([]);
  });

  it('should return an empty array for null input', () => {
    expect(fibs(null)).toEqual([]);
  });
});
