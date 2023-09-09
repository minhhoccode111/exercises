# Some notes about this project in Vietnamese

## Lưu ý:

Đặc điểm quan trọng nhất của các methods tương tác với cây tìm kiếm nhị phân BST (như delete, insert) là:

- recursive function sẽ có root mặc định là root hiện tại của cây

```
const method = (val, root = this.root) => {}
```

- basecase sẽ là `root === null` và `return root` nghĩa là mình đã đi đến nhánh cuối của cây

```jsx
if (root === null) return root;
```

- tất cả các `return` của recursive function call đều sẽ `return root` vì mình gọi recursive function trên một nhánh của `root` hiện tại và nhánh đó sẽ là `root` của recursive function call mới nên mình bắt buộc phải `return root` để giữ cây nguyên vẹn, nhưng (hoặc) nếu mình muốn bỏ qua node(s) thì mình có thể dùng `return root.right` (nếu muốn bỏ qua node hiện tại và dùng nhánh phải của node hiện tại để thay thế chính nó) hoặc (và) ngược lại `return root.left`.
- Cách gọi recursion:

```jsx
if (val < root.data) {
  // go left
  root.left = recursive(val, root.left);
} else {
  // go right
  root.right = recursive(val, root.right);
}
```

- cách `return` nếu muốn bỏ qua node:

```jsx
if(){
	// go left
	const leftNode = root.left
	delete root
	return leftNode
}else{
	// go right
	const rightNode = root.right
	delete root
	return rightNode
}
```

- các hành động xảy ra khi muốn `del` 1 node:
  - ta đã dùng recursive calls (`root.left = del(val, root.left)` or `root.right = del(val, root.right)`) để di chuyển tới node cần `del`
  - khi phát hiện ra node cần `del` và nó là leaf node (2 nhánh con của nó đều là `null`) thì mình chỉ cần đơn giản là `return null` (thay vì `return root`) nghĩa là node parent của nó (node cần `del`) sẽ mất liên kết với nó (vì mình đã `return null`)
  - khi phát hiện ra node cần `del` và 1 trong 2 nhánh con của nó là `null` thì mình chỉ cần `return` node con của nhánh còn lại (`return root.left` or `return root.right`) nghĩa là mình bỏ qua nó (node cần `del`) và dùng con của nó (nhánh trái hoặc phải) để liên kết lại thành cây
  - khi phát hiện ra node cần `del` (trong recursive function call hiện tại gọi là `root` ) và cả 2 nhánh con của nó đều là node(s) không phải `null` thì mình sẽ đi về nhánh bên phải của `root` là `root.right` và đi sâu nhất có thể về bên trái của nhánh phải cho tới khi đụng `null`--> `root.right.left.left.left === null` (node sâu nhất bên trái của nhánh bên phải chính là node cần dùng để thay thế `root` node mà mình cần xóa vì nó sẽ là node nhỏ nhất của nhánh bên phải `root.right` nhưng cùng lúc sẽ lớn hơn tất cả các node của nhánh bên trái `root.left`)
    - sau khi đi tới điểm sâu nhất, ví dụ `root.right.left.left.left` (tức là `=== null`) thì lúc này nghĩa là node `root.right.left.left` (tạm gọi là `leftMost`) chính là node mình cần tìm để thay thế `root` hiện tại. `leftMost` có parent là `root.right.left` (tạm gọi là `leftMostParent`).
      - Mình tiến hành thay thế root bằng cách copy data của `leftMost` vào `root` --> `root.data = leftMost.data` và cho `leftMostParent` liên kết với nhánh bên phải của `leftMost` (không cần quan tâm là `null` hay không) --> `leftMostParent.left = leftMost.right` (và `delete leftMost` sau đó để xóa hoặc tự động garbage collector của JavaScript sẽ `delete` nó vì không còn bất kỳ `reference` nào trỏ tới nó nữa). `return root` sau khi hoàn thành công đoạn xóa
    - trong trường hợp mình gặp `null` ngay node đầu tiên sau khi đi về nhánh bên phải, tức là node đầu tiên này là `root.right.left === null` thì node đầu tiên này chính là node nhỏ nhất của nhánh bên phải của `root`. Khi này thì `leftMost = root.right` và `leftMostParent` cũng chính là `root` (`leftMostParent = root`). Nên ta sẽ cho `leftMostParent.right = leftMost.right` ngược lại với phía trên và sau đó `delete leftMost`. `return root` sau khi hoàn thành công đoạn xóa

```jsx
const del = (val, root) => {
  if (root === null) {
    return root;
  }
  if (val < root.data) {
    root.left = del(val, root.left);
    return root;
  } else if (val > root.data) {
    root.right = del(val, root.right);
    return root;
  }
  if (root.left === null) {
    const rightNode = root.right;
    delete root;
    return rightNode;
  } else if (root.right === null) {
    const leftNode = root.left;
    delete root;
    return leftNode;
  } // from root, we have to go to right branch and find the to left-most node, which will be used to take place of the root (which will be deleted) later, because the left-most node of the right branch is the smallest node to the right branch but always bigger than all the nodes on the left branch of current root. left-most-parent is used to store to node right before the left-most node so that we can easily replace the reference if we reach the left-most node (in case the left-most node is still having child (on the right))
  let leftMostParent = root;
  let leftMost = leftMostParent.right;
  while (leftMost.left !== null) {
    leftMostParent = leftMost; // mark the left-most
    leftMost = leftMost.left; // go left again
  }
  if (leftMostParent !== root) {
    // if left-most-parent had moved, which means after we moved to the right at first, there is still room for us to go left (left-most.left is not null)
    leftMostParent.left = leftMost.right; // then we create new reference for left-most-parent to ignore left-most and link straight to left-most.right (left-most.left===null) and left-most will be used to replace to current root
  } else {
    // if left-most-parent didn't move, which means after the first time we went to the right branch once and that node is null and the left-most-parent is still === current root.
    leftMostParent.right = leftMost.right; // then we ignore left-most node (which didn't take any move to the left at all) and assign new reference to left-most-parent
  } // copy left-most's data to root's data (so we actually don't delete it)
  root.data = leftMost.data; // instead we delete left-most node (we already did new connect references for it before deleting it)
  delete leftMost; // return root to keep node's references
  return root;
};
```
