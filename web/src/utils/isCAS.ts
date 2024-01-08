export const isCAS = (text: string) => {
  return /^\d[0-9\-]*\d$/.test(text);
};
