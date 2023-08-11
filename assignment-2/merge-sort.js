// Build a function "mergeSort" that takes in an array and returns a sorted array, using a recursive merge sort methodology.

// Tips:

// Think about what the base case is and what behavior is happening again and again and can actually be delegated to someone else (e.g. that same function!).

// It may be helpful to checkout the background videos again if you don't quite understand what should be going on.

const sort = (arr1, arr2, arr = [], i = 0, j = 0, k = 0) => {
  const item1 = arr1[i];
  const item2 = arr2[j];
  const l1 = arr1.length;
  const l2 = arr2.length;
  if (i === l1 && j === l2) return arr;
  // if one arr reach the last index, then we just copy the rest of other arr to final arr
  if ((i === l1 && j < l2) || (i < l1 && j === l2)) {
    // only one while loop execute
    while (i < l1) {
      arr[k] = arr1[i];
      k++;
      i++;
    }
    while (j < l2) {
      arr[k] = arr2[j];
      k++;
      j++;
    }
    return arr;
  }
  if (item1 >= item2) {
    arr.push(item2);
    return sort(arr1, arr2, arr, i, j + 1, k + 1);
  }
  arr.push(item1);
  return sort(arr1, arr2, arr, i + 1, j, k + 1);
};

const mergeSort = (arr) => {
  // const arr = [1, 2, 3, 4, 5, 6, 7];

  const length = arr.length;

  if (length < 2) return arr;

  const middle = Math.floor(length / 2);

  // right always greater or equal
  const right = arr.splice(middle, length - 1);

  const arr1 = mergeSort(arr);

  // so arr2 greater or equal
  const arr2 = mergeSort(right);

  return sort(arr1, arr2);
};

const list0 = [2, 6, 7, 71, 1, 23, 13, 5, 14, 23, 3, 5, 7, 8, 97, 89];
const list1 = [2, 4, 6, 7, 8, 1, 9, 1, 64, 79, 6, 3, 2, 2, 3, 7, 3, 2];
const list2 = [8, 7, 6, 5, 4, 3, 2, 1];
const list3 = [8, 7, 6, 5, 4, 3, 2];

console.log(mergeSort(list0)); // [1, 2, 3, 5, 5, 6, 7, 7, 8, 13, 14, 23, 23, 71, 89, 97];
console.log(mergeSort(list1)); // [1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 6, 6, 7, 7, 8, 9, 64, 79];
console.log(mergeSort(list2)); // [1, 2, 3, 4, 5, 6, 7, 8];
console.log(mergeSort(list3)); // [2, 3, 4, 5, 6, 7, 8];
