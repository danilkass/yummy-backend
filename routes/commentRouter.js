import { Router } from "express";
import { Controller as CommentController } from "../controllers/commentController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
import commentValidation from "../validations/commentVadation.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = new Router();

router.post(
  "/",
  authMiddleware,
  checkRoleMiddleware(["admin", "user"]),
  commentValidation,
  CommentController.create
);
router.get("/", CommentController.get);
router.delete("/", CommentController.delete);
router.patch(
  "/",
  authMiddleware,
  checkRoleMiddleware(["admin", "user"]),
  commentValidation,
  CommentController.update
);

// export default router;
export { router as commentRouter };
