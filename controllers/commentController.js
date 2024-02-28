import { validationResult } from "express-validator";
import { Comment } from "../models/models.js";

class CommentController {
  async create(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { userId, postId, comment } = req.body;

      const newComment = new Comment({
        userId: userId,
        postId: postId,
        comment: comment,
      });

      await newComment.save();

      res.json(newComment);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.body;
      await Comment.findByIdAndDelete(id);
      res.json({ message: "Успішно видалено" });
    } catch (error) {
      next(ApiError.internal("Сталася помилка"));
    }
  }
  async update(req, res) {
    const { id, comment } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedComment = await Comment.findOneAndUpdate(
      { _id: id },
      { comment: comment },
      { new: true }
    );
    res.json(updatedComment);
  }

  async get(req, res) {
    let { limit, page } = req.query;
    const { id } = req.params;

    page = page || 1;
    limit = limit || 10;
    let offset = page * limit - limit;

    const count = await Comment.countDocuments();
    const posts = await Comment.find({ postId: id }).skip(offset).limit(limit);

    res.json({ count, posts });
  }
}
export const Controller = new CommentController();
