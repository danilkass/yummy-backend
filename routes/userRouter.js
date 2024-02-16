import { Router } from "express";
import { Controller as UserController } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import { registrationValidation } from "../validations/index.js";

const router = new Router();

router.post("/login", UserController.login);
router.post(
  "/registration",
  validationMiddleware(registrationValidation),
  UserController.registration
);
router.get("/auth", authMiddleware, UserController.check);
router.get("/:id", UserController.getOne);
router.patch("/", checkRoleMiddleware(["admin"]), UserController.changeRole);

export { router as userRouter };
