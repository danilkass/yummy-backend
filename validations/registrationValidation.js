import { body } from "express-validator";
import ApiError from "../error/ApiError.js";

const registrationValidation = [
  body("email", "Невірно задана пошта.").isEmail(),
  body("password", "Пароль має бути мінімум 6 символів.").isLength({ min: 6 }),
  body("name", "Вкажіть ім'я").isLength({ min: 3 }),
  body("avatar").optional(),
];

export default registrationValidation;
