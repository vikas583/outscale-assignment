import path from "path";

export const createPublicURL = (filePath: string) => {
  filePath = path.normalize(filePath);
  // remove the path prefix till /public/assets
  const prefix = path.join(__dirname, "../../public/assets/");
  let trimmedPath = filePath.replace(prefix, "").trim();

  if (path.sep === "\\") {
    trimmedPath = trimmedPath.replace(/\\/g, "/");
  }
  return `${process.env.APP_HOST}/assets/${trimmedPath}`;
};
