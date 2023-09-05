console.log('Hello, World!');

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

{
  // my brutal force implementation using my own understanding
  // => not good because create too many extra spaces with slice method

  const createBST = (arr) => {
    if (arr.length === 1) {
      return { val: arr[0], left: null, right: null };
    }
    if (arr.length === 0) return null;

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid + 1);

    return {
      left: createBST(left),
      val: arr[mid],
      right: createBST(right),
    };
  };
}

{
  // this is memory friendlier using indexes
  // but a little bit complicated and overhead thinking about the logic
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  class Node {
    constructor(val, left = null, right = null) {
      this.val = val;
      this.left = left;
      this.right = right;
    }
  }
  // solution on geeksforgeeks using indexes and Node class
  const sortedArrToBST = (arr, start = 0, end = arr.length - 1, mid = Math.floor((start + end) / 2)) => {
    // if start and end are pointing to the same index
    if (start === end) return new Node(start);
    // if start index is 1 unit less than end index (which means there is only 2 indexes left) return new Node create with end index, which has left property is a new Node create with start index
    if (start + 1 === end) return new Node(arr[end], new Node(arr[start]));
    // else create new node with value = index of mid then recursively call
    return new Node(arr[mid], sortedArrToBST(arr, start, mid - 1), sortedArrToBST(arr, mid + 1, end));
  };
  const bst = sortedArrToBST(arr);
}

{
  // using indexes but easier to read with object literal
  const sortedArrToBST = (arr, start = 0, end = arr.length - 1, mid = Math.floor((start + end) / 2)) => {
    if (start > end) return null;
    return { val: arr[mid], left: sortedArrToBST(arr, start, mid - 1), right: sortedArrToBST(arr, mid + 1, end) };
  };
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const bst = sortedArrToBST(arr);
}
