interface Obj {
  [key: string]: string | null | undefined;
}

type toRemove = null | string | undefined;

export const transformObject = <T>(
  obj: Obj /** object to be transformed */,
  toRemove: toRemove[] /** field object to be deleted based on its value */
): T => {
  let newObj: Obj = {};
  let newKeys = Object.keys(obj).filter(
    (item) => !toRemove.includes(obj[item])
  );

  newKeys.forEach((key) => {
    newObj[key] = obj[key];
  });

  return newObj as T;
};
