const LinkedList = require('./linked-list');

const HashMap = () => {
  const _loadFactor = 0.75;
  let _size = 16;
  const _buckets = [];
  let _length = 0;
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
  const get = (key) => (_buckets[_index(key)] === undefined ? null : _buckets[_index(key)]); // return null if empty
  const set = (key, value) => {
    const isNull = get(key) === null;
    // write
    if (isNull) _length++;
    // remove
    if (value === undefined) _length--;
    _buckets[_index(key)] = value;
    // write new -> true, overwrite -> false
    return isNull;
  };
  const has = (key) => set(key, get(key));
  const remove = (key) => set(key, undefined);
  const length = () => _length;
  const clear = () => {
    _buckets = [];
    _length = 0;
  };
  const keys = () => {
    return;
  };
  const values = () => _buckets.filter((current, index) => {});
  const entries = () => {
    //
  };
  return {};
};
