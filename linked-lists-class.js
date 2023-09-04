console.log('Hello, World!');

// LINKED LISTS WITH CLASSES

// factory function to encapsulate variables to use private
// class Node {
//   constructor(value = null, next = null) {
//     this.value = value;
//     this.next = next;
//   }
// }

const Node = (value = null, next = null) => {
  let _value = value;
  const getValue = () => _value;
  const setValue = (v) => (_value = v);

  let _next = next;
  const getNext = () => _next;
  const setNext = (v) => (_next = v);
  return {
    getNext,
    setNext,
    getValue,
    setValue,
  };
};

// Linked List class
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(value) {
    // create new node with pass in value
    const node = Node(value);
    // if list is currently empty
    if (this.size === 0) {
      // then head IS tail at the same time
      this.head = node;
      this.tail = node;
      // increase size
      this.size = 1;
      // then return size just like array's push method
      return 1;
    }

    // else set current tail's next to be new node
    this.tail.setNext(node);
    // then set new node to be tail
    this.tail = node;
    // return size
    this.size++;
    return this.size;
  }

  prepend(value) {
    // new node
    const node = Node(value);
    if (this.size === 0) {
      this.head = node;
      this.tail = node;
      this.size = 1;
      return 1;
    }

    // then new create node's next property to be current head
    node.setNext(this.head);
    // then set node to be head
    this.head = node;
    this.size++;
    return this.size;
  }

  getSize() {
    return this.size;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  at(index, current = 0, currentNode = this.head) {
    // undefined if we try to find node out of range
    if (index === this.size || index < 0) return;

    // stop condition of recursion
    if (index === current) return currentNode;

    // recursion call
    return this.at(index, current + 1, currentNode.getNext());
  }

  pop() {
    // if there is nothing to pop
    if (this.size === 0) return null;
    // save current tail
    const removeItem = this.tail;
    // decrease size
    this.size--;
    // get new tail at size-1 (index)
    this.tail = this.at(this.size - 1);
    // reset new tail's next property
    this.tail.setNext(null);
    // return pop node
    return removeItem;
  }

  contains(value, currentNode = this.head, index = 0) {
    // end of list then false
    if (this.size === index) return false;
    // return true if found
    if (currentNode.getValue() === value) return true;
    // recursive call
    return this.contains(value, currentNode.getNext(), index + 1);
  }

  find(value, currentNode = this.head, index = 0) {
    // return -1 if not found
    if (this.size === index) return -1;
    // return index if found
    if (currentNode.getValue() === value) return index;
    // recursive call
    return this.find(value, currentNode.getNext(), index + 1);
  }

  toString(currentNode = this.head, index = 0, string = '') {
    if (index === this.size) return string + 'null';

    let currentNodesString = currentNode.getValue().toString();

    let format = `( ${currentNodesString} ) -> `;

    return this.toString(currentNode.getNext(), index + 1, string + format);
  }

  insertAt(value, index) {
    // handling error, can't insert at head or tail, USE APPEND & PREPEND INSTEAD!
    if (index === 0 || index === this.size) return;
    // create new node
    const node = Node(value);
    // get node before index to insert
    const beforeIndex = this.at(index - 1);
    // save current index node
    const currentIndex = beforeIndex.getNext();
    // insert
    node.setNext(currentIndex);
    beforeIndex.setNext(node);
    // increase list's size
    this.size++;
    // return newly added node's reference
    return node;
  }

  removeAt(index) {
    // handling error but unlike insert, which can insert after last index (or use it like push), we can't remove after last index, so we check if index equal size
    if (index < 0 || index === this.size) return;
    // get node before index
    const beforeIndex = this.at(index - 1);
    const currentIndex = beforeIndex.getNext();
    const afterIndex = currentIndex.getNext();
    // remove at index by ignoring node at that index
    beforeIndex.setNext(afterIndex);
    // decrease size
    this.size--;
    // erase reference in currentIndex node
    currentIndex.setNext(null);
    // return removed node which only has value property left to access
    return currentIndex;
  }
}

const list = new LinkedList();
// try to pop something from empty list
console.log(list.pop()?.getValue()); // undefined
list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.append(5);
console.log(list.toString()); // ( 1 ) -> ( 2 ) -> ( 3 ) -> ( 4 ) -> ( 5 ) -> null

list.prepend(6);
list.prepend(7);
list.append(8);
console.log(list.toString()); // ( 7 ) -> ( 6 ) -> ( 1 ) -> ( 2 ) -> ( 3 ) -> ( 4 ) -> ( 5 ) -> ( 8 ) -> null

console.log(list.getSize()); // 8

console.log(list.getHead().getValue()); // 7

console.log(list.getTail().getValue()); // 8

console.log(list.at(2).getValue()); // 1
console.log(list.at(3).getNext().getValue()); // 3

console.log(list.pop()?.getValue()); // 8
console.log(list.toString()); // ( 7 ) -> ( 6 ) -> ( 1 ) -> ( 2 ) -> ( 3 ) -> ( 4 ) -> ( 5 ) -> null

console.log(list.contains(8)); // false
console.log(list.contains(7)); // true
list.append('a');
console.log(list.contains('a')); // true
console.log(list.toString()); // ( 7 ) -> ( 6 ) -> ( 1 ) -> ( 2 ) -> ( 3 ) -> ( 4 ) -> ( 5 ) -> ( a ) -> null

console.log(list.find('a')); // 7
console.log(list.find(7)); // 0
console.log(list.find(3)); // 4

const returnInsertRef = list.insertAt('b', 1);
console.log(list.find(returnInsertRef.getValue())); // 1
console.log(list.toString()); // ( 7 ) -> ( b ) -> ( 6 ) -> ( 1 ) -> ( 2 ) -> ( 3 ) -> ( 4 ) -> ( 5 ) -> ( a ) -> null
console.log(list.getHead().getValue()); // 7
console.log(list.getTail().getValue()); // 'a'
