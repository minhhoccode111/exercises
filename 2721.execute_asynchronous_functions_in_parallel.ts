type Fn<T> = () => Promise<T>;

function promiseAll<T>(functions: Fn<T>[]): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const result: any[] = [];
    let counter = 0;

    for (let i = 0, len = functions.length; i < len; i++) {
      // a counter to know how many promise have resolved

      functions[i]()
        .then((d) => {
          result[i] = d;

          counter++;
          if (counter === len) resolve(result);
        })
        .catch(reject);
    }
  });
}

/**
 * const promise = promiseAll([() => new Promise(res => res(42))])
 * promise.then(console.log); // [42]
 */
