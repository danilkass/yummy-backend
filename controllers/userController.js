import ApiError from "../error/ApiError.js";
import { User, UserSave } from "../models/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import imageUpload from "../utils/imageUpload.js";
import { validationResult } from "express-validator";

const generateJwt = ({ email, id, role, avatar }) => {
  console.log(
    jwt.sign({ id, email, role, avatar }, process.env.SECRET_KEY, { expiresIn: "24h" })
  );
  return jwt.sign({ id, email, role, avatar }, process.env.SECRET_KEY, { expiresIn: "24h" });
};

class UserController {
  async registration(req, res, next) {
    const { name, email, password } = req.body;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let fileName = await imageUpload(req, "avatar", "userAvatar", next);

      const candidate = await User.findOne({ email });
      if (candidate) {
        return next(ApiError.badRequest("Користувач з такою адресою вже зареєстрованний."));
      }
      const hashPassword = await bcrypt.hash(password, 5);

      const user = new User({
        name: name,
        email: email,
        password: hashPassword,
        avatar: fileName,
      });
      await user.save();

      const token = generateJwt(user);
      res.json({ user, token });
    } catch (error) {
      // Обработка ошибок при сохранении пользователя
      next(ApiError.badRequest(error.message));
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return next(ApiError.unauthorized("Такого користувача не існує."));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.unauthorized("Не вірний пароль."));
    }
    const token = generateJwt(user);
    console.log(user);
    return res.json({ user, token });
  }

  async check(req, res, next) {
    // const { id, email, name, ro } = req.body;

    const token = generateJwt(req.user);
    const user = await User.findOne({ email: req.user.email });

    console.log(req.user.email, req.user.id, req.user.role, req.user.avatar);

    return res.json({ user, token });
  }

  async getOne(req, res, next) {
    const { id } = req.params;

    const user = await User.findById(id);
    const userSaves = await UserSave.find({ userId: id });
    const userSubscribers = await Subscriber.find({ targetUser: id });

    if (userSaves.length === 0) {
      return res.json({ user, message: "У користувача немає збережених записів." });
    }

    if (!user) {
      res.json("Такого корустувача не існує.");
    } else {
      res.json({ user, userSaves, userSubscribers });
    }
  }

  async changeRole(req, res, next) {
    const { id, role } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: id }, // критерий поиска пользователя по ID
      { role: role }, // поля, которые нужно обновить
      { new: true } // опция, чтобы вернуть обновленный документ
    );

    if (!updatedUser) {
      next(ApiError.badRequest("Користувача не знайдено."));
    }
    res.json(updatedUser);
  }
}
export const Controller = new UserController();
