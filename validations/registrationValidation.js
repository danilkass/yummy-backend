import { body } from "express-validator";

const registrationValidation = [
  body("email", "Невірно задана пошта.").isEmail(),
  body("password", "Пароль має бути мінімум 6 символів.").isLength({ min: 6 }),
  body("name", "Вкажіть ім'я").isLength({ min: 3 }),
  body("avatar").optional(),
];

export { registrationValidation };
