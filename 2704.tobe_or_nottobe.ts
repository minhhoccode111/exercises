type ToBeOrNotToBe = {
  toBe: (val: any) => boolean;
  notToBe: (val: any) => boolean;
};

function expect(val: any): ToBeOrNotToBe {
  return {
    toBe: (testVal) => {
      if (val === testVal) return true;
      throw new Error("Not Equal");
    },
    notToBe: (testVal) => {
      if (val !== testVal) return true;
      throw new Error("Equal");
    },
  };
}
