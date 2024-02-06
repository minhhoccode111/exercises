// LINKED LISTS WITH FACTORIES
class Node {
  constructor(key = null, value = null, next = null) {
    this.k = key;
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
  get key() {
    return this.k;
  }
  set key(newKey) {
    this.k = newKey;
  }
}

module.export = function LinkedList() {
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
  const prepend = (k, v) => {
    if (_size === 0) {
      const node = new Node(k, v);
      _head = node;
      _tail = node;
      _size = 1;
      return 1;
    }
    const node = new Node(k, v, _head);
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
