import ApiError from "../error/ApiError.js";
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      next(ApiError.unauthorized("Користувач не авторизований."));
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    console.log("decoded= ", decoded, req.user);
    next();
  } catch (error) {
    next(ApiError.unauthorized("Користувач не авторизований."));
  }
};

export default authMiddleware;
