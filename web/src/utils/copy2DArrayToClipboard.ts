import { copyTextToClipboard } from "./copyToClipboard";

export function copy2DArrayToClipboard(array: any[][]) {
  var rows: any[] = [];
  for (var i = 0; i < array.length; ++i) {
    rows.push(array[i].join("\t"));
  }

  const str = rows.join("\r\n");
  copyTextToClipboard(str);
}
