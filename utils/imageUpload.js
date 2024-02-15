import ApiError from "../error/ApiError.js";
import { v4 as uuidv4 } from "uuid";
import { resolve } from "path";
import { fileURLToPath } from "url";

const imageUpload = async (req, fieldName, dirName, next) => {
  try {
    if (req.files !== null && req.files && fieldName in req.files) {
      let image = req.files[fieldName];
      if (Array.isArray(image)) {
        image = image[0];
      }
      const allowedExtensions = ["jpg", "jpeg", "png"];
      const fileExtension = image.name.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        return next(
          ApiError.badRequest(
            "Неприпустиме розширення файлу. Допустимі розширення: jpg, jpeg, png"
          )
        );
      }

      let fileName = uuidv4() + "." + fileExtension;

      const __fileUrl = fileURLToPath(import.meta.url);
      const __mainDir = resolve(__fileUrl, "..");
      image.mv(resolve(__mainDir, "..", "static", dirName, fileName));
      return fileName;
    }
  } catch (error) {
    next(ApiError.badRequest(error.message));
  }
};

export default imageUpload;
