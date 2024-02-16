import ApiError from "../error/ApiError.js";
import { Post, User, UserSave } from "../models/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import imageUpload from "../utils/imageUpload.js";

const generateJwt = ({ email, id, role }) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: "24h" });
};

class UserController {
  async registration(req, res, next) {
    const { name, email, password } = req.body;

    try {
      let fileName = await imageUpload(req, "avatar", "userAvatar", next);

      const candidate = await User.findOne({ email });
      if (candidate) {
        return next(ApiError.badRequest("Користувач з такою адресою вже зареєстрованний."));
      }
      const hashPassword = await bcrypt.hash(password, 5);

      const newUser = new User({
        name: name,
        email: email,
        password: hashPassword,
        avatar: fileName,
      });
      await newUser.save();

      const token = generateJwt(newUser);
      res.json(token);
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
    return res.json({ token });
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }

  async getOne(req, res, next) {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      res.json("Такого корустувача не існує.");
    } else {
      res.json(user);
    }
  }

  async changeRole(req, res) {
    const { id, role } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: id }, // критерий поиска пользователя по ID
      { role: role }, // поля, которые нужно обновить
      { new: true } // опция, чтобы вернуть обновленный документ
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "Користувача не знайдено." });
    }
    res.json(updatedUser);
  }
}
export const Controller = new UserController();
