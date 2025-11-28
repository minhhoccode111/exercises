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

{
  // re-implement insert
  const insert = (val, root = null) => {
    if (root === null) {
      root = Node(val);
      return root;
    }

    if (root.data > val) {
      // go left
      root.left = insert(val, root.left);
    } else if (root.data < val) {
      // go right
      root.right = insert(val, root.right);
    }

    // nothing happens if root.data === val
    return root;
  };
}

{
  // re-implement delete
  const del = (val, root) => {
    // base case
    if (root === null) {
      return root;
    }

    if (val < root.data) {
      // go left
      root.left = del(val, root.left);
      return root;
    } else if (val > root.data) {
      // go right
      root.right = del(val, root.right);
      return root;
    }

    // equal
    // has 1 child
    if (root.left === null) {
      // return root.right instead of return root like normal because we ignore current root
      const rightNode = root.right;
      delete root;
      return rightNode;
    } else if (root.right === null) {
      const leftNode = root.left;
      delete root;
      return leftNode;
    }

    // has 2 children
    // from root, we have to go to right branch and find the to left-most node, which will be used to take place of the root (which will be deleted) later, because the left-most node of the right branch is the smallest node to the right branch but always bigger than all the nodes on the left branch of current root. left-most-parent is used to store to node right before the left-most node so that we can easily replace the reference if we reach the left-most node (in case the left-most node is still having child (on the right))
    let leftMostParent = root;
    let leftMost = leftMostParent.right;
    // steps to go to the left-most
    while (leftMost.left !== null) {
      leftMostParent = leftMost; // mark the left-most
      leftMost = leftMost.left; // go left again
    }

    if (leftMostParent !== root) {
      // if left-most-parent had moved, which means after we moved to the right at first, there is still room for us to go left (left-most.left is not null)
      leftMostParent.left = leftMost.right;
      // then we create new reference for left-most-parent to ignore left-most and link straight to left-most.right (left-most.left===null) and left-most will be used to replace to current root
    } else {
      // if left-most-parent didn't move, which means after the first time we went to the right branch once and that node is null and the left-most-parent is still === current root.
      leftMostParent.right = leftMost.right;
      // then we ignore left-most node (which didn't take any move to the left at all) and assign new reference to left-most-parent
    }

    // copy left-most's data to root's data (so we actually don't delete it)
    root.data = leftMost.data;
    // instead we delete left-most node (we already did new connect references for it before deleting it)
    delete leftMost;
    // return root to keep node's references
    return root;
  };
}
