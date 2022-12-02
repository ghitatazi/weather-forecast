// prettier-ignore
export const getSlicedObject = <T extends object, >(obj: T) =>
  Object.entries(obj).slice(0, 5);
