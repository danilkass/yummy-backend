import { body } from "express-validator";

const postValidation = [
  body("title", "Заголовок обов'язковий для заповнення.").notEmpty(),
  body("subtitle", "Підзаголовок обов'язковий для заповнення.").notEmpty(),
  body("youtubeUrl", "Невірний формат посилання на YouTube.")
    .optional()
    .isURL({ protocols: ["https"], require_protocol: true }),
  body("text", "Текст поста обов'язковий для заповнення.").notEmpty(),
  body("userId", "Ідентифікатор користувача обов'язковий для заповнення.").notEmpty(),
  body("ingredients", "Інгридиенти обов'язкові для заповнення.").optional().notEmpty(),
];

export default postValidation;
