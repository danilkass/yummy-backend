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
  async delete(req, res, next) {}
  async get(req, res) {} //getOne or getAll?
}
export const Controller = new SavesController();
