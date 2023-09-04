export const sortDesc = (arr: Array<any>, field: string): Array<any> => {
  return arr.sort((a, b) => {
    if (a[field] > b[field]) {
      return -1;
    }
    if (b[field] > a[field]) {
      return 1;
    }
    return 0;
  });
};
