console.log('Hello, World!');

// LINKED LISTS WITH FACTORIES

class Node {
  constructor(value = null, next = null) {
    this.v = value;
    this.n = next;
  }

  get value() {
    return this.v;
  }

  set value(v) {
    this.v = v;
  }

  get next() {
    return this.n;
  }

  set next(v) {
    this.n = v;
  }
}

const LinkedList = () => {
  let _head = null;
  let _tail = null;
  let _size = 0;

  const head = () => _head;
  const tail = () => _tail;
  const size = () => _size;

  const append = (value) => {
    const node = new Node(value);
    if (_size === 0) {
      _head = node;
      _tail = node;
      _size = 1;
      return 1; // linked list size
    }

    _tail.next = node;
    _tail = node;
    _size++;
    return _size;
  };

  const prepend = (v) => {
    if (_size === 0) {
      const node = new Node(v);
      _head = node;
      _tail = node;
      _size = 1;
      return 1;
    }

    const node = new Node(v, _head);
    _head = node;
    _size++;
    return _size;
  };

  const at = (index, current = 0, currentNode = _head) => {
    if (index === _size || index < 0) return;
    if (index === current) return currentNode;
    return at(index, current + 1, currentNode.next);
  };

  const pop = () => {
    if (_size === 0) return;
    const removeItem = _tail;
    _size--;
    _tail = at(_size - 1);
    _tail.next = null;
    return removeItem;
  };

  const contains = (val, currentNode = _head, index = 0) => {
    if (_size === index) return false;
    if (currentNode.value === val) return true;
    return contains(val, currentNode.next, index + 1);
  };

  const find = (val, currentNode = _head, index = 0) => {
    if (_size === index) return -1;
    if (currentNode.value === val) return index;
    return find(val, currentNode.next, index + 1);
  };

  const toString = (currentNode = _head, index = 0, string = '') => {
    if (index === _size) return string + 'null';
    let currentNodesString = currentNode.value.toString();
    let format = `( ${currentNodesString} ) -> `;
    return toString(currentNode.next, index + 1, string + format);
  };

  const insertAt = (val, index) => {
    if (index === 0 || index === _size) return;
    const beforeIndexNode = at(index - 1);
    const currentIndexNode = beforeIndexNode.next;
    const node = new Node(val, currentIndexNode);
    beforeIndexNode.next = node;
    _size++;
    return node;
  };

  const removeAt = (index) => {
    if (index < 0 || index === _size) return; // error cases
    let currentIndex;
    if (index === 0) {
      currentIndex = _head; // index===0 so we remove current _head, work like array.shift()
      _head = _head.next; //
    } else {
      const beforeIndex = at(index - 1);
      currentIndex = beforeIndex.next;
      const afterIndex = currentIndex.next;
      beforeIndex.next = afterIndex;
    }
    _size--;
    currentIndex.next = null;
    return currentIndex;
  };

  return {
    head,
    tail,
    size,
    append,
    prepend,
    at,
    pop,
    contains,
    find,
    insertAt,
    removeAt,
    toString,
  };
};

const list = LinkedList();
// try to pop something from empty list
console.log(list.pop()?.value); // undefined
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

console.log(list.size()); // 8

console.log(list.head().value); // 7

console.log(list.tail().value); // 8

console.log(list.at(2).value); // 1
console.log(list.at(3).next.value); // 3

console.log(list.pop()?.value); // 8
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
console.log(list.find(returnInsertRef.value)); // 1
console.log(list.toString()); // ( 7 ) -> ( b ) -> ( 6 ) -> ( 1 ) -> ( 2 ) -> ( 3 ) -> ( 4 ) -> ( 5 ) -> ( a ) -> null
console.log(list.head().value); // 7
console.log(list.tail().value); // 'a'

const returnRemoveRef = list.removeAt(2);
console.log(returnRemoveRef.value); // 6
console.log(list.toString()); // ( 7 ) -> ( b ) -> ( 1 ) -> ( 2 ) -> ( 3 ) -> ( 4 ) -> ( 5 ) -> ( a ) -> null
list.removeAt(0);
console.log(list.toString()); // ( b ) -> ( 1 ) -> ( 2 ) -> ( 3 ) -> ( 4 ) -> ( 5 ) -> ( a ) -> null
