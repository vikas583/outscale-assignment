export const saveFile = (file: any, name: string, type: string) => {
  var a = document.createElement("a");
  a.href = type + file;
  a.download = name;
  a.click();
};
