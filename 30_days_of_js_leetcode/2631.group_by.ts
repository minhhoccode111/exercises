declare global {
  interface Array<T> {
    groupBy(fn: (item: T) => string): Record<string, T[]>;
  }
}

Array.prototype.groupBy = function (fn) {
  const table = {};

  for (let i = 0, len = this.length; i < len; i++) {
    const item = this[i];
    const prop = fn(item);

    if (table.hasOwnProperty(prop)) table[prop][table[prop].length] = item;
    else table[prop] = [item];
  }

  return table;
};

/**
 * [1,2,3].groupBy(String) // {"1":[1],"2":[2],"3":[3]}
 */
