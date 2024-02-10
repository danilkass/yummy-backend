import { Router } from "express";
import { Controller as UserController } from "../controllers/userController.js";

const router = new Router();

router.post("/login", UserController.login);
router.post("/registration", UserController.registration);
router.get("/auth", UserController.check);
router.patch("/", UserController.update);

export { router as userRouter };
