export const sanitizeString = (str: string) => {
  return str.replace(/[^\w ]/g, "");
};
