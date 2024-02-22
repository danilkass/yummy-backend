import { UserSave } from "../models/models.js";
import ApiError from "../error/ApiError.js";
class SavesController {
  async create(req, res, next) {
    try {
      const { userId, postId } = req.body;

      const newSaves = new UserSave({
        userId: userId,
        postId: postId,
      });

      await newSaves.save();

      res.json(newSaves);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.body;
      await UserSave.findByIdAndDelete(id);
      console.log(id);
      res.json({ message: "Успішно видалено" });
    } catch (error) {
      next(ApiError.internal("При видалені сталася помилка"));
    }
  }
}
export const Controller = new SavesController();
