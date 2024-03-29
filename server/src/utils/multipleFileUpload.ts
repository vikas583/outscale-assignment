import multer, { Options } from "multer";
import path from "path";
import { APIError } from "./APIError";

export const multipleFileUpload: Options = {
  storage: multer.diskStorage({
    destination: path.join(__dirname, "../../public/assets"),
    filename: (_, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
  fileFilter: async (_req, file, cb) => {
    if (
      !["image/png", "image/jpg", "image/jpeg", "application/pdf"].includes(
        file.mimetype
      )
    ) {
      return cb(
        new APIError("Only .png, .jpg, .jpeg and .pdf files are allowed", 400)
      );
    }
    return cb(null, true);
  },
  limits: {
    files: 30,
    fieldNameSize: 255,
    fileSize: Infinity,
  },
};
