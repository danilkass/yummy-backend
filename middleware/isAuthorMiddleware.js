// import ApiError from "../error/ApiError.js";
// import jwt from "jsonwebtoken";
// import { Post } from "../models/models.js";

// const isAuthorMiddleware = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const post = await Post.findById(id);

//     if (req.method === "OPTIONS") {
//       next();
//     }

//     const token = req.headers.authorization.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);

//     if (post.userId.toString() !== decoded.id.toString()) {
//       next(ApiError.forbidden("Ви не є автором."));
//     }

//     next();
//   } catch (error) {
//     next(ApiError.unauthorized("Користувач не авторизований."));
//   }
// };

// export default isAuthorMiddleware;

import ApiError from "../error/ApiError.js";
import jwt from "jsonwebtoken";
import { Post } from "../models/models.js";

const isAuthorMiddleware = (forAdmin) => async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (req.method === "OPTIONS") {
      next();
      return;
    }

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (post.userId.toString() !== decoded.id.toString()) {
      if (forAdmin && forAdmin === true) {
        // Добавляем проверку на роль администратора
        if (decoded.role !== "admin") {
          return next(ApiError.forbidden("Ви не є автором або адміністратором."));
        }
      } else {
        return next(ApiError.forbidden("Ви не є автором."));
      }
    }

    next();
  } catch (error) {
    next(ApiError.unauthorized("Користувач не авторизований."));
  }
};

export default isAuthorMiddleware;
