export const format = (val: string) => {
  val = val.replace(/[a-z]/gi, '');
  return parseFloat(val.replace(/,/g, ''));
};
