type JSONValue =
  | null
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue };
type Obj = Record<string, JSONValue> | Array<JSONValue>;

function chunk(arr: Obj[], size: number): Obj[][] {
  const result: Obj[][] = [];

  for (let i = 0, len = arr.length; i < len; i += size) {
    result[result.length] = arr.slice(i, i + size);
  }

  return result;
}
