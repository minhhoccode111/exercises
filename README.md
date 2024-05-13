# Binary Search Trees

## Building a balanced Binary Search Tree

![A screenshot of the Binary Search Trees](public/bst.png)

## Links

- [Link to assignment](https://www.theodinproject.com/lessons/javascript-binary-search-trees)

## Summary

All of my Binary Search Tree functions can be found in my `src/js/index.js` file. This project contains:

```jsx
// Node Factory function
const Node = (data, left = null, right = null) => ({ data, left, right });

// a merge recursive function to use combine with mergeSort
// which sort and remove duplicate at the same time
const merge = (arr1, arr2, result = [], i1 = 0, i2 = 0) => {
  // code
};

const mergeSort = (arr) => {
  // code
};

// combine with buildTree function
const recursiveBuildTree = (
  sortedArr,
  start = 0,
  end = sortedArr.length - 1,
  mid = Math.floor((start + end) / 2),
) => {
  // code
};

// buildTree first sort input array
// then pass sorted array to recursiveBuildTree
// which will return the root node of the tree
const buildTree = (arr) => {
  const sorted = mergeSort(arr);
  return recursiveBuildTree(sorted);
};

// Tree Factory function
const Tree = (arr = null) => {
  // private, encapsulated _root variable using buildTree with passed in arr
  let _root = buildTree(arr);

  ///// INSERT \\\\\
  const insert = (val, root = _root) => {
    // code
  };

  ///// DELETE \\\\\
  const del = (val, root = _root) => {
    // code
  };

  ///// FIND \\\\\
  const find = (val, root = _root) => {
    // code
  };

  ///// LEVEL ORDER \\\\\
  const levelOrder = (callback, root = _root) => {
    // code
  };

  ///// LEVEL ORDER RECURSION \\\\\
  const levelOrderRec = (
    callback,
    root = _root,
    queue = [root],
    arr = [],
    i = 0,
  ) => {
    // code
  };

  ///// PREORDER : root - left -right \\\\\
  const preorder = (callback, root = _root) => {
    // code
  };

  ///// INORDER : left - root - right \\\\\
  const inorder = (callback, root = _root) => {
    // code
  };

  ///// POSTORDER : right - root - left \\\\\
  const postorder = (callback, root = _root) => {
    // code
  };

  ///// HEIGHT \\\\\
  const height = (root = _root) => {
    // code
  };

  ///// DEPTH \\\\\
  const depth = (node, root = _root) => {
    // code
  };

  ///// IS BALANCED \\\\\
  const isBalanced = (outerRoot = _root) => {
    // code
  };

  ///// RE-BALANCED \\\\\
  const reBalance = (root = _root) => {
    // code
  };

  ///// PRINT TREE \\\\\
  const prettyPrint = (node = _root, prefix = "", isLeft = true) => {
    // code
  };

  ///// RETURN FROM FACTORY \\\\\
  return {
    del,
    root: _root,
    find,
    depth,
    height,
    insert,
    inorder,
    preorder,
    postorder,
    reBalance,
    isBalanced,
    levelOrder,
    prettyPrint,
    levelOrderRec,
  };
};
```

The `buildTree(arr)` function takes an array, sorted it, pass it in `recursiveBuildTree` then return the root node of tree.
The links provided on The Odin Project's assignment page were very helpful in helping me solve a lot of these functions.

## Notes

- I remove duplicated items at the same time when sorting array with `mergeSort` because I just want to recall `mergeSort`
- but we can use a more efficiency way like this:

```js
[...new Set(arr.sort((a, b) => a - b))];
```

- I learned a lot when trying to wrap my head around all these recursive functions :D

## Ideas to implement

- A website has interactive UI to build trees and using methods dynamic
