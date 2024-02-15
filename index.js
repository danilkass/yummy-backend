//npm run dev - start development server
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/index.js";
import ErrorHandlingMiddleware from "./middleware/ErrorHandlingMiddleware.js";
import fileUpload from "express-fileupload";

import { fileURLToPath } from "url";
import { resolve } from "path";

dotenv.config();

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..");

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(resolve(__dirname, "static", "post")));
app.use("/api", router);

//---------------------------------------
app.use(ErrorHandlingMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => console.log(`Server started on PORT:${PORT}`));
  } catch (err) {
    console.error("Error starting server:", err);
  }
};
start();
