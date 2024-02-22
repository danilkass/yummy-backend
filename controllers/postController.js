import ApiError from "../error/ApiError.js";
import { Post, Ingredient, User } from "../models/models.js";
import imageUpload from "../utils/imageUpload.js";
import isAuthorCheck from "../utils/isAuthorCheck.js";

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
    const user = await User.find({ _id: post.userId });

    res.json({ post, user, ingredients });
  }

  //   async getAll(req, res, next) {
  //     try {
  //       let { limit, page } = req.query;
  //       page = page || 1;
  //       limit = limit || 100;
  //       let offset = page * limit - limit;

  //       const count = await Post.countDocuments();
  //       const posts = await Post.find().skip(offset).limit(limit);

  //       res.json({ count, posts });
  //     } catch (error) {
  //       next(ApiError.internal(error.message));
  //     }
  //   }
  async getAll(req, res, next) {
    try {
      let { limit, page } = req.query;
      page = page || 1;
      limit = limit || 100;
      let offset = page * limit - limit;

      const count = await Post.countDocuments();
      const set = await Post.find().skip(offset).limit(limit);

      const posts = await Promise.all(
        set.map(async (post) => {
          const ingredients = await Ingredient.find({ postId: post._id });
          const user = await User.find({ _id: post.userId });
          return { post, user, ingredients };
        })
      );

      console.log(posts);
      res.json({ count, posts });
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async delete(req, res, next) {
    try {
      const isAutor = await isAuthorCheck(req, res, next);
      if (!isAutor) {
        return next(ApiError.forbidden("Ви не є автором."));
      }

      const { id } = req.params;
      await Post.findByIdAndDelete(id);
      await Ingredient.deleteMany({ userId: id });

      res.json("Пост успішно видалено");
    } catch (error) {
      next(ApiError(internal("При видалені поста сталася помилка")));
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    const { title, subtitle, youtubeUrl, img, text, ingredients } = req.body;

    try {
      const isAutor = await isAuthorCheck(req, res, next);

      if (!isAutor) {
        return next(ApiError.forbidden("Ви не є автором."));
      }

      let fileName = img;
      if (req.files) {
        fileName = await imageUpload(req, "img", "post", next);
      }

      const post = await Post.findByIdAndUpdate(
        id,
        {
          title: title,
          subtitle: subtitle,
          youtubeUrl: youtubeUrl,
          text: text,
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
    } catch (error) {
      next(ApiError.badRequest("Помилка при оновлені поста"));
    }
  }
}

export const Controller = new PostController();
