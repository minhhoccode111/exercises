const LinkedList = require('./linked-list');
// LinkedList methods
// append: function append(value, key)
// at: function at(index, current, currentNode)
// contains: function contains(key, currentNode, index)
// find: function find(key, currentNode, index)
// head: function head()
// insertAt: function insertAt(val, key, index)
// pop: function pop()
// prepend: function prepend(value, key)
// removeAt: function removeAt(index)
// size: function size()
// tail: function tail()
// toString: function toString(currentNode, index, string)

const HashMap = () => {
  const _loadFactor = 0.75;
  const _buckets = [];
  const _keys = [];
  let _length = 0;
  let _size = 16;
  const _hash = (key) => {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode;
  };
  const _index = (key) => {
    const hashCode = _hash(key);
    return hashCode % _size;
  };
  const get = (key) => {
    const bucket = _buckets[_index(key)];
  };
  const set = (key, value) => {
    //
  };
  const has = (key) => {
    //
  };
  const remove = (key) => {
    //
  };
  const length = () => {
    //
  };
  const clear = () => {
    //
  };
  const keys = () => {
    //
  };
  const values = () => {
    //
  };
  const entries = () => {
    // [[firstKey, firstValue], [secondKey, secondValue]]
  };
  return {};
};
