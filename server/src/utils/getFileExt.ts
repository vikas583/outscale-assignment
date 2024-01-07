import path from "path";

export const getFileExt = (fileName: string) => path.extname(fileName).slice(1);
