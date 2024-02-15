import ApiError from "../error/ApiError.js";
import { validationResult } from "express-validator";

const validationMiddleware = (validationRules) => {
  return async (req, res, next) => {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      //   const arrayRules = validationRules;
      for (const rule of validationRules) {
        await rule.run(req); // Выполняем проверку
      }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest(errors));
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validationMiddleware;
