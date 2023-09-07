// console.log('Hello, World!');

const arr = [];
for (let i = 1; i < 45; i++) {
  arr.push(5 * i);
}

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

const Tree = (arr = null) => {
  let _root = buildTree(arr);

  ///// INSERT \\\\\
  const insert = (val, root = _root) => {
    if (root === null) {
      root = Node(val);
      return root;
    }

    if (root.data > val) {
      root.left = insert(val, root.left);
    } else {
      root.right = insert(val, root.right);
    }

    return root;
  };

  ///// DELETE \\\\\
  const del = (val, root = _root) => {
    // Base case
    if (root === null) {
      return root;
    }

    // Recursive calls for ancestors of
    // node to be deleted
    if (root.data > val) {
      root.left = del(val, root.left);
      return root;
    } else if (root.data < val) {
      root.right = del(val, root.right);
      return root;
    }

    // We reach here when root is the node
    // to be deleted.

    // If one of the children is empty
    if (root.left === null) {
      let temp = root.right;
      delete root;
      return temp;
    } else if (root.right === null) {
      let temp = root.left;
      delete root;
      return temp;
    }

    // If both children exist
    else {
      let succParent = root;

      // Find successor
      let succ = root.right;
      while (succ.left !== null) {
        succParent = succ;
        succ = succ.left;
      }

      // Delete successor.  Since successor
      // is always left child of its parent
      // we can safely make successor's right
      // right child as left of its parent.
      // If there is no succ, then assign
      // succ.right to succParent.right
      if (succParent !== root) {
        succParent.left = succ.right;
      } else {
        succParent.right = succ.right;
      }

      // Copy Successor Data to root
      root.data = succ.data;

      // Delete Successor and return root
      delete succ;
      return root;
    }
  };

  ///// FIND \\\\\
  const find = () => {};

  ///// LEVEL ORDER \\\\\
  const levelOrder = () => {};

  ///// INORDER \\\\\
  const inorder = () => {};

  ///// PREORDER \\\\\
  const preorder = () => {};

  ///// POSTORDER \\\\\
  const postorder = () => {};

  ///// HEIGHT \\\\\
  const height = () => {};

  ///// DEPTH \\\\\
  const depth = () => {};

  ///// IS BALANCED \\\\\
  const isBalanced = () => {};

  ///// RE-BALANCED \\\\\
  const reBalance = () => {};

  ///// PRINT TREE \\\\\
  const prettyPrint = (node = _root, prefix = '', isLeft = true) => {
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

  ///// RETURN \\\\\
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
  };
};

const a = Tree(arr);
a.prettyPrint();
