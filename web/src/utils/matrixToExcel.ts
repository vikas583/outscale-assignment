import { Matrix } from "react-spreadsheet";
import { utils, write } from "xlsx";

export const matrixToExcel = (arr: Matrix<any>, page: number) => {
  const output: any[][] = [];
  for (const rows of arr) {
    output.push(rows.map((r) => r.value));
  }
  const wb = utils.book_new();
  wb.Props = {
    Title: "Exported Table",
  };
  const sheetName = `Page ${page}`;
  wb.SheetNames.push(sheetName);
  const ws = utils.aoa_to_sheet(output);
  wb.Sheets[sheetName] = ws;
  return write(wb, {
    bookType: "xlsx",
    type: "base64",
  });
};
