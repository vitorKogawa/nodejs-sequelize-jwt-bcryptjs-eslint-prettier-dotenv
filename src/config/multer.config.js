import { resolve, extname } from "path";
import { randomBytes } from "crypto";
import * as multer from "multer";

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, "..", "..", "tmp", "uploads"),
    filename: (request, file, callback) => {
      randomBytes(256, (error, response) => {
        if (error) return callback(error);
        return callback(
          null,
          response.toString("hex") + extname(file.originalname)
        );
      });
    },
  }),
};
