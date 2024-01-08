export const toTitleCase = (str: string) => {
  if (str.length === 0) {
    return "";
  }
  return str
    .split(" ")
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");
};
