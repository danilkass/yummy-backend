import { Router } from "express";
import { Controller as UserController } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
import { registrationValidation } from "../validations/registrationValidation.js";
// import registrationValidation from "../validations/registrationValidation.js";

const router = new Router();

router.post(
  "/login",
  //  authValidation,
  UserController.login
);
router.post("/registration", registrationValidation, UserController.registration);
router.get("/auth", authMiddleware, UserController.check);
router.get("/:id", UserController.getOne);
router.patch(
  "/",
  checkRoleMiddleware(["admin"]),
  //   registrationValidation,
  UserController.changeRole
);

export { router as userRouter };
