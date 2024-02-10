//npm run dev - start development server
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/index.js";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

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
