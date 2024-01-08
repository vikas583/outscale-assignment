import { Matrix } from "react-spreadsheet";

export const tableJsonToMatrix = (
  json: Record<string, Record<string, any>>
) => {
  const rows = Object.values(json);
  const out: Matrix<{
    value: any;
  }> = [];
  for (let i = 0; i < rows.length; i++) {
    if (!out[i]) {
      out[i] = [];
    }
    for (const value of Object.values(rows[i])) {
      out[i].push({ value });
    }
  }
  return out;
};
