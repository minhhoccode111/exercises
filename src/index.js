// console.log('Hello, World!');

const arr = [];
for (let i = 1; i < 64; i++) {
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
  const levelOrderRec = (callback, root = _root, queue = [root], arr = [], i = 0) => {
    if (!queue[i]) {
      if (callback === undefined) return arr;
      return;
    }

    if (callback) {
      callback(queue[i]);
    } else {
      arr.push(queue[i].data);
    }
    if (queue[i].left) queue.push(queue[i].left);
    if (queue[i].right) queue.push(queue[i].right);
    return levelOrderRec(callback, root, queue, arr, i + 1);
  };

  ///// PREORDER : root - left -right \\\\\
  const preorder = (callback, root = _root) => {
    const stack = [];

    // recursion preorder
    const preorderTraversal = (innerCallback = callback, innerRoot = root, arr = stack) => {
      if (innerRoot === null) return;

      // read node first
      if (innerCallback) {
        innerCallback(innerRoot);
      } else {
        // arr.push(innerRoot);
        arr.push(innerRoot.data);
      }

      // then read left
      preorderTraversal(innerCallback, innerRoot.left, arr);

      // then read right
      preorderTraversal(innerCallback, innerRoot.right, arr);
    };

    preorderTraversal();

    if (!callback) return stack;
  };

  ///// INORDER : left - root - right \\\\\
  const inorder = (callback, root = _root) => {
    const stack = [];

    const inorderTraversal = (innerCallback = callback, innerRoot = root, arr = stack) => {
      if (innerRoot === null) return;

      // read left first
      inorderTraversal(innerCallback, innerRoot.left, arr);

      // read root
      if (innerCallback) {
        innerCallback(innerRoot);
      } else {
        // arr.push(innerRoot);
        arr.push(innerRoot.data);
      }

      // read right
      inorderTraversal(innerCallback, innerRoot.right, arr);
    };

    inorderTraversal();

    if (!callback) return stack;
  };

  ///// POSTORDER : right - root - left \\\\\
  const postorder = (callback, root = _root) => {
    const stack = [];

    const postorderTraversal = (innerCallback = callback, innerRoot = root, arr = stack) => {
      if (innerRoot === null) return;

      // read right
      postorderTraversal(innerCallback, innerRoot.right, arr);

      // read root
      if (innerCallback) {
        innerCallback(innerRoot);
      } else {
        // arr.push(innerRoot);
        arr.push(innerRoot.data);
      }

      // read left
      postorderTraversal(innerCallback, innerRoot.left, arr);
    };

    postorderTraversal();

    if (!callback) return stack;
  };

  ///// HEIGHT \\\\\
  const height = (root = _root) => {
    if (root === null) return 0;

    const leftHeight = height(root.left);

    const rightHeight = height(root.right);

    const maxHeight = Math.max(leftHeight, rightHeight);

    return 1 + maxHeight;
  };

  ///// DEPTH \\\\\
  const depth = (node, root = _root) => {
    if (root === null || node === null) {
      return 0;
    }

    return height(root) - height(node);
  };

  ///// IS BALANCED \\\\\
  const isBalanced = (outerRoot = _root) => {
    let flag = true;

    const recursion = (root = outerRoot) => {
      if (root === null) return 0;

      const leftHeight = recursion(root.left);

      const rightHeight = recursion(root.right);

      const minHeight = Math.min(leftHeight, rightHeight);

      const maxHeight = Math.max(leftHeight, rightHeight);

      const diff = maxHeight - minHeight;

      // change outer variable if any 2 branches not balanced
      if (diff > 1) {
        flag = false;
      }

      return 1 + maxHeight;
    };

    recursion();

    return flag;
  };

  ///// RE-BALANCED \\\\\
  const reBalance = (root = _root) => {
    const arr = inorder(undefined, root);
    _root = buildTree(arr);
    return true;
  };

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
