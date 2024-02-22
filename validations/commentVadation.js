import { body } from "express-validator";

const commentValidation = [body("comment", "Невірно задана пошта.").notEmpty()];

export default commentValidation;
