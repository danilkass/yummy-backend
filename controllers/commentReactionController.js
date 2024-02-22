import { CommentReaction } from "../models/models.js";
import ApiError from "../error/ApiError.js";

class CommentReactionController {
  async create(req, res, next) {
    try {
      const { userId, commentId, reaction } = req.body;

      const newCommentReaction = new CommentReaction({
        userId: userId,
        commentId: commentId,
        reaction: reaction,
      });

      await newCommentReaction.save();

      res.json(newCommentReaction);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.body;
      await CommentReaction.findByIdAndDelete(id);
      res.json({ message: "Успішно видалено" });
    } catch (error) {
      next(ApiError.internal("При видалені сталася помилка"));
    }
  }

  async update(req, res) {
    const { id, reaction } = req.body;
    const updatedCommentReaction = await CommentReaction.findOneAndUpdate(
      { _id: id },
      { reaction: reaction },
      { new: true }
    );

    if (!updatedCommentReaction) {
      next(ApiError.badRequest("Комментарії не знайдено."));
    }
    res.json(updatedCommentReaction);
  }
}
export const Controller = new CommentReactionController();
