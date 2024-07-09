class TimeLimitedCache {
  constructor() {
    const map = {};

    const set = (key: number, value: number, duration: number): boolean => {
      const expireAt = Date.now() + duration;

      const obj = { expireAt, value };

      const existed = map[key] !== undefined && map[key].expireAt > Date.now();

      map[key] = obj;

      return existed;
    };

    const get = (key: number): number => {
      return map[key] && map[key].expireAt > Date.now() ? map[key].value : -1;
    };

    const count = (): number => {
      let counter = 0;
      for (const key in map) {
        if (map[key] && map[key].expireAt > Date.now()) counter++;
      }
      return counter;
    };

    return { set, get, count };
  }
}

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */
