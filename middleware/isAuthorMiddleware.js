import ApiError from "../error/ApiError.js";
import jwt from "jsonwebtoken";
import { Post } from "../models/models.js";

const isAuthorMiddleware = (forAdmin) => {
  console.log("1");
  return async (req, res, next) => {
    console.log("2");
    if (req.method === "OPTIONS") {
      next();
    }
    console.log("3");
    try {
      console.log("4");
      const findPost = async (id) => {
        return (post = await Post.findById(id));
      };
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      console.log(req.user);
      const { id } = req.params;

      const post = await findPost(id);
      console.log(post);

      if (post.userId !== decoded.id) {
        next(ApiError.forbidden("Ви не є автором."));
      } else if (forAdmin && decoded.role !== "admin") {
        next(ApiError.forbidden("Ви не є адміністратором."));
      }
      console.log("COOOOOOOOOOOLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
      next();
    } catch (error) {
      next(ApiError.unauthorized("Користувач не авторизований."));
    }
  };
};

export default isAuthorMiddleware;
