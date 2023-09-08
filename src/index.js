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
    if (root === null) {
      return root;
    }

    if (root.data > val) {
      root.left = del(val, root.left);
      return root;
    } else if (root.data < val) {
      root.right = del(val, root.right);
      return root;
    }

    if (root.left === null) {
      let temp = root.right;
      delete root;
      return temp;
    } else if (root.right === null) {
      let temp = root.left;
      delete root;
      return temp;
    } else {
      let succParent = root;

      let succ = root.right;
      while (succ.left !== null) {
        succParent = succ;
        succ = succ.left;
      }

      if (succParent !== root) {
        succParent.left = succ.right;
      } else {
        succParent.right = succ.right;
      }

      root.data = succ.data;

      delete succ;
      return root;
    }
  };

  ///// FIND \\\\\
  const find = (val, root = _root) => {
    if (root.data === val) return root;
    if (root.data > val) {
      return find(val, root.left);
    } else {
      return find(val, root.right);
    }
  };

  ///// LEVEL ORDER \\\\\
  const levelOrder = (callback, root = _root) => {
    const arr = [];
    const queue = [root];
    let i = 0;
    while (queue[i]) {
      if (callback) {
        callback(queue[i]);
      } else {
        arr.push(queue[i].data);
      }
      if (queue[i].left) queue.push(queue[i].left);
      if (queue[i].right) queue.push(queue[i].right);
      i++;
    }

    if (callback === undefined) return arr;
  };

  ///// LEVEL ORDER RECURSION \\\\\
  const levelOrderRec = (callback, root = _root, arr = [], queue = [root], i = 0) => {
    if (!queue[i]) {
      if (callback === undefined) return arr;
      return;
    }

    if (callback) {
      callback(queue[i]);
    } else {
      arr.push(queue[i].data);
    }
    if (root.left) queue.push(queue[i].left);
    if (root.right) queue.push(queue[i].right);
    return levelOrderRec(callback, root, arr, queue, i + 1);
  };

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
    levelOrderRec,
  };
};

const a = Tree(arr);
a.prettyPrint();
