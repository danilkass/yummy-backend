class SubscribeController {
  async create(req, res, next) {
    try {
      const { targetUser, subscriber } = req.body;
      const newSubscriber = new Subscriber({
        targetUser: targetUser,
        subscriber: subscriber,
      });

      await newSubscriber.save();

      res.json(newSubscriber);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.body;
      await Subscriber.findByIdAndDelete(id);
      res.json({ message: "Успішно видалено" });
    } catch (error) {
      next(ApiError.internal("Сталася помилка"));
    }
  }
}
export const Controller = new SubscribeController();
