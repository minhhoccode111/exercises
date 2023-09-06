// console.log('Hello, World!');

const arr = [2, 7, 12, 4, 6, 7, 4, 3, 1, 9, 8, 10];
const sorted = [1, 2, 3, 4, 6, 7, 8, 9, 10, 12];

const Node = (data, left = null, right = null) => ({ data, left, right });

const merge = (arr1, arr2, result = [], i1 = 0, i2 = 0) => {
  if (i1 === arr1.length && i2 === arr2.length) {
    return result;
  }

  if (!arr1[i1]) {
    result.push(arr2[i2]);
    return merge(arr1, arr2, result, i1, i2 + 1);
  }

  if (!arr2[i2]) {
    result.push(arr1[i1]);
    return merge(arr1, arr2, result, i1 + 1, i2);
  }

  // remove duplicate
  if (arr1[i1] === arr2[i2]) {
    return merge(arr1, arr2, result, i1, i2 + 1);
  }

  if (arr1[i1] > arr2[i2]) {
    result.push(arr2[i2]);
    return merge(arr1, arr2, result, i1, i2 + 1);
  }

  result.push(arr1[i1]);
  return merge(arr1, arr2, result, i1 + 1, i2);
};

const mergeSort = (arr) => {
  if (arr.length < 2) return arr;

  const mid = Math.floor(arr.length / 2);

  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
};

const recursiveBuildTree = (sortedArr, start = 0, end = sortedArr.length - 1, mid = Math.floor((start + end) / 2)) => {
  if (start > end) return null;
  return Node(sortedArr[mid], recursiveBuildTree(sortedArr, start, mid - 1), recursiveBuildTree(sortedArr, mid + 1, end));
};

const buildTree = (arr) => {
  const sorted = mergeSort(arr);
  return recursiveBuildTree(sorted);
};

class Tree {
  constructor(arr = null) {
    this.root = buildTree(arr);
  }
  insert(val) {
    const node = Node(val);
    if (this.root === null) {
      this.root = node;
      return;
    }

    let prev = null;
    let temp = this.root;
    while (temp !== null) {
      prev = temp;
      if (val < temp.data) {
        temp = temp.left;
      } else {
        temp = temp.right;
      }
    }
    if (val < prev.data) {
      prev.left = node;
    } else {
      prev.right = node;
    }
  }
  delete(val) {
    if (this.root === null) return;
    let prev = null;
    let temp = this.root;

    while (temp !== null) {
      prev = temp;
      if (temp.data === val) {
        break;
      } else if (temp.data > val) {
        temp = temp.left;
      } else {
        temp = temp.right;
      }
    }
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const a = new Tree(arr);
prettyPrint(a.root);
a.insert(1);
a.insert(12);
a.insert(123);
prettyPrint(a.root);
