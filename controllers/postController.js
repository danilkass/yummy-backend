import ApiError from "../error/ApiError.js";
import { Post, Ingredient } from "../models/models.js";
import imageUpload from "../utils/imageUpload.js";

class PostController {
  async create(req, res, next) {
    const { title, subtitle, youtubeUrl, text, userId, ingredients } = req.body;

    try {
      let fileName = await imageUpload(req, "img", "post", next);
      if (!fileName) {
        next(ApiError.badRequest("Обов'язкове зображення!"));
        return;
      }
      const newPost = new Post({
        title: title,
        subtitle: subtitle,
        img: fileName,
        youtubeUrl: youtubeUrl,
        text: text,
        userId: userId,
      });
      await newPost.save();

      let parsedIngredients = JSON.parse(ingredients);
      parsedIngredients.forEach(async (i) => {
        const newIngredient = new Ingredient({
          name: i.name,
          quantity: i.quantity,
          postId: newPost._id,
        });
        await newIngredient.save();
      });

      res.json(newPost);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getOne(req, res) {
    const { id } = req.params;
    const post = await Post.findById(id);
    const ingredients = await Ingredient.find({ postId: id });
    res.json({ post, ingredients });
  }
  async getAll(req, res, next) {
    try {
      let { limit, page } = req.query;
      page = page || 1;
      limit = limit || 10;
      let offset = page * limit - limit;

      const count = await Post.countDocuments();
      const posts = await Post.find().skip(offset).limit(limit);

      res.json({ count, posts });
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }
  async delete(req, res, next) {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    res.json(post);
  }
  async update(req, res, next) {
    const { id } = req.params;
    const { title, subtitle, youtubeUrl, text, userId, ingredients } = req.body;
    let fileName = await imageUpload(req, "img", "post", next);

    const post = await Post.findByIdAndUpdate(
      id,
      {
        title: title,
        subtitle: subtitle,
        youtubeUrl: youtubeUrl,
        text: text,
        userId: userId,
        img: fileName,
      },
      { new: true }
    );
    await Ingredient.deleteMany({ postId: id });

    let parsedIngredients = JSON.parse(ingredients);
    parsedIngredients.forEach(async (i) => {
      const newIngredient = new Ingredient({
        name: i.name,
        quantity: i.quantity,
        postId: post._id,
      });
      await newIngredient.save();
    });

    res.json(post);
  }
}
export const Controller = new PostController();
