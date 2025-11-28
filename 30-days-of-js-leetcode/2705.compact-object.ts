type JSONValue =
  | null
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue };
type Obj = Record<string, JSONValue> | Array<JSONValue>;

function compactObject(obj: Obj): Obj {
  const type = getType(obj);

  if (type === "array") return forArray(obj);
  else if (type === "object") return forObject(obj);
}

function forObject(obj: any) {
  const result = {};
  for (const key in obj) {
    const item = obj[key];
    const type = getType(item);
    if (type === "array") result[key] = forArray(item);
    else if (type === "object") result[key] = forObject(item);
    else if (type === "true") result[key] = item;
  }
  return result;
}

function forArray(arr: any) {
  const result: any[] = [];
  for (const item of arr) {
    const type = getType(item);
    if (type === "array") result.push(forArray(item));
    else if (type === "object") result.push(forObject(item));
    else if (type === "true") result.push(item);
  }

  return result;
}

function getType(value: any) {
  if (value instanceof Array) return "array";
  if (value instanceof Object) return "object";
  if (Boolean(value)) return "true";
  return "false";
}
