import ApiError from "../error/ApiError.js";

class PostReactionController {
  async create(req, res, next) {
    try {
      const { userId, postId, reaction } = req.body;
      const newPostReaction = new PostReaction({
        userId: userId,
        postId: postId,
        reaction: reaction,
      });
      await newPostReaction.save();
      res.json(newPostReaction);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.body;
      await PostReaction.findByIdAndDelete(id);
      res.json({ message: "Успішно видалено" });
    } catch (error) {
      next(ApiError.internal("Сталася помилка"));
    }
  }
  async update(req, res) {
    const { id, reaction } = req.body;
  }
}
export const Controller = new PostReactionController();
