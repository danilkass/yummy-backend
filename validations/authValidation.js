import { body } from "express-validator";

const authValidation = [
  body("email", "Невірно задана пошта.").isEmail(),
  body("password", "Пароль має бути мінімум 6 символів.").isLength({ min: 6 }),
];

export default authValidation;
