import ApiError from "../error/ApiError.js";
import jwt from "jsonwebtoken";
import { Post } from "../models/models.js";

const isAuthorCheck = async (req, res, next, forAdmin) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return next(ApiError.notFound("Пост не знайдено."));
    }

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (post.userId.toString() !== decoded.id.toString()) {
      next(ApiError.forbidden("Ви не є автором."));
      return false;
    }

    if (
      (forAdmin && req.user.role !== "admin") ||
      post.userId.toString() !== decoded.id.toString()
    ) {
      next(ApiError.forbidden("Ви не є автором або адміністратором."));
      return false;
    }

    return true;
  } catch (error) {
    next(ApiError.internal(error.message));
    return false;
  }
};

export default isAuthorCheck;
