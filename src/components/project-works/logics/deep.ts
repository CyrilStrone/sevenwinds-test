export const getDeep = (arr: any, level: number): number => {
  let localLevel = level;
  arr.child.forEach((e: any) => {
    localLevel = getDeep(e, localLevel + 1);
  });
  return localLevel;
};

export const getLastDeep = (arr: any, level: number): number => {
  let localLevel = level + arr.child.length;
  arr.child.forEach((e: any) => {
    localLevel = getLastDeep(e, localLevel);
  });
  return localLevel;
};
