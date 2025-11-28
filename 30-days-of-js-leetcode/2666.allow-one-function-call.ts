type JSONValue =
  | null
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue };
type OnceFn = (...args: JSONValue[]) => JSONValue | undefined;

function once(fn: Function): OnceFn {
  let counter = 0;
  return function (...args) {
    if (counter !== 0) return;
    counter++;

    return fn(...args);
  };
}
