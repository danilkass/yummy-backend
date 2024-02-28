import { body } from "express-validator";

const postValidation = [
  body("title", "Заголовок обов'язковий для заповнення.").notEmpty(),
  body("subtitle", "Підзаголовок обов'язковий для заповнення.").notEmpty(),
  body("youtubeUrl")
    .optional()
    .custom((value) => {
      if (!value.includes("youtube.com")) {
        throw new Error("Посилання повинне бути на YouTube відео.");
      }
      // Регулярное выражение для проверки шаблона URL-адреса YouTube-видео
      const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
      if (!value.match(youtubeRegex)) {
        throw new Error("Невірний формат посилання на YouTube.");
      }
      return true;
    }),
  body("text", "Текст поста обов'язковий для заповнення.").notEmpty(),
  //   body("userId", "Ідентифікатор користувача обов'язковий для заповнення.").notEmpty(),
  body("ingredients", "Інгридиенти обов'язкові для заповнення.").optional().notEmpty(),
];

export default postValidation;
