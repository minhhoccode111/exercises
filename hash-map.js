// Linked list's node
class Node {
  constructor(value = null, key = null, next = null) {
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

// LINKED LISTS WITH FACTORIES
const LinkedList = () => {
  let _head = null;
  let _tail = null;
  let _size = 0;
  const head = () => _head;
  const tail = () => _tail;
  const size = () => _size;
  const append = (value, key) => {
    const node = new Node(value, key);
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
  const prepend = (value, key) => {
    if (_size === 0) {
      const node = new Node(value, key);
      _head = node;
      _tail = node;
      _size = 1;
      return 1;
    }
    const node = new Node(value, key, _head);
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
  const contains = (key, currentNode = _head, index = 0) => {
    if (_size === index) return false;
    if (currentNode.key === key) return true;
    return contains(key, currentNode.next, index + 1);
  };
  const find = (key, currentNode = _head, index = 0) => {
    if (_size === index) return -1;
    if (currentNode.key === key) return index;
    return find(key, currentNode.next, index + 1);
  };
  const toString = (currentNode = _head, index = 0, string = '') => {
    if (index === _size) return string + 'null';
    let currentNodesString = currentNode.value.toString();
    let format = `( ${currentNodesString} ) -> `;
    return toString(currentNode.next, index + 1, string + format);
  };
  const insertAt = (value, key, index) => {
    if (index === 0 || index === _size) return;
    const beforeIndexNode = at(index - 1);
    const currentIndexNode = beforeIndexNode.next;
    const node = new Node(value, key, currentIndexNode);
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
  const values = (results = [], currentNode = _head) => {
    if (currentNode === null) return;
    return values([...results, currentNode.value], _head.next);
  };
  const entries = (results = [], currentNode = _head) => {
    if (currentNode === null) return;
    return entries([...results, [currentNode.key, currentNode.value]]);
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
    values,
  };
};

const HashMap = () => {
  const _loadFactor = 0.75;
  let _buckets = [];
  let _keys = [];
  let _size = 16;
  // hashing a key for index
  const _hash = (key) => {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % _size;
    }
    return hashCode;
  };

  // will be a linked list or undefined
  const _getBucket = (key) => _buckets[_hash(key)];
  // will be a linked list node or undefined
  const _getNode = (key) => _getBucket(key)?.at(_getBucket(key)?.find(key));
  // will be a key's value or null
  const get = (key) => _getNode(key)?.value ?? null;
  const set = (key, value) => {
    // resizing O(n)
    if (_keys.length() === _size * _loadFactor) {
      _size *= 2;
      // TODO: implement re-placing key-value to new buckets with new size (add current key-value at the same time then return)
    }

    const bucket = _getBucket(key);
    // bucket is linked list, key existed, update value
    if (bucket !== undefined && bucket.find(key) !== -1) {
      _getNode(key).value = value;
      return false; // for overwrite
    }

    // bucket is undefined, create linked list, append
    if (bucket === undefined) {
      _buckets[_hash(key)] = LinkedList();
      _buckets[_hash(key)].append(value, key);
    }

    // bucket is linked list, key not existed, append
    else {
      bucket.append(value, key);
    }
    _keys.push(key);
    return true; // for add new
  };
  const has = (key) => get(key) !== null;
  const remove = (key) => {
    if (!has(key)) return false;
    _getBucket(key).removeAt(_getBucket(key).find(key));
    return true;
  };
  const length = () => _keys.length;

  const clear = () => {
    _keys = [];
    _buckets = [];
  };
  const keys = () => _keys;
  const values = () => {
    let results = [];
    for (let i = 0; i < _size; i++) {
      const currentBucket = _buckets[i];
      if (currentBucket === undefined) continue;
      results = [...results, ...currentBucket.values()];
    }
  };
  const entries = () => {
    // [[firstKey, firstValue], [secondKey, secondValue]]
    let results = [];
    for (let i = 0; i < _size; i++) {
      const currentBucket = _buckets[i];
      if (currentBucket === undefined) continue;
      results = [...results, ...currentBucket.entries()];
    }
  };
  return { get, set, has, remove, length, clear, keys, values, entries };
};
