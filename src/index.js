console.log('Hello, World!');

const arr = [2, 7, 12, 4, 6, 7, 4, 3, 1, 9, 8, 10];

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

const buildTree = (arr) => {};

const Tree = (arr) => ({
  root: buildTree(arr),
  insert() {},
  delete() {},
  find() {},
  levelOrder() {},
  inorder() {},
  preorder() {},
  postorder() {},
  height() {},
  depth() {},
});

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
