import { Router } from "express";
import { Controller as postController } from "../controllers/postController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import isAuthorMiddleware from "../middleware/isAuthorMiddleware.js";

const router = new Router();

router.post(
  "/",
  authMiddleware,
  checkRoleMiddleware(["admin", "user"]),
  postController.create
);
router.get("/", postController.getAll);
router.get("/:id", postController.getOne);
router.delete("/:id", isAuthorMiddleware(true), postController.delete);
router.patch("/:id", authMiddleware, isAuthorMiddleware, postController.update);

// export default router;
export { router as postRouter };
