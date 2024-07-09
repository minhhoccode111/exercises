type JSONValue =
  | null
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue };
type ArrayType = { id: number } & Record<string, JSONValue>;

function join(arr1: ArrayType[], arr2: ArrayType[]): ArrayType[] {
  const result: any[] = [];
  const table = {};

  // loop through each item
  for (let i = 0, lenI = arr1.length; i < lenI; i++) {
    const item = arr1[i];
    // store on table
    table[item.id] = item;
  }

  // loop through each item
  for (let j = 0, lenJ = arr2.length; j < lenJ; j++) {
    const item = arr2[j];
    // if item.id existed on table
    if (table[item.id])
      // merge old with new (override)
      table[item.id] = Object.assign({}, table[item.id], item);
    // else just set
    else table[item.id] = item;
  }

  const keys = Object.keys(table);
  for (const key of keys) {
    result[result.length] = table[key];
  }

  return result;
}
