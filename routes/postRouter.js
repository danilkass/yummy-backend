import { Router } from "express";
import { Controller as postController } from "../controllers/postController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import postValidation from "../validations/postValidation.js";

const router = new Router();

router.post(
  "/",
  authMiddleware,
  checkRoleMiddleware(["admin", "user"]),
  validationMiddleware(postValidation),
  postController.create
);
router.get("/", postController.getAll);
router.get("/:id", postController.getOne);
router.delete("/:id", postController.delete);
router.patch(
  "/:id",
  authMiddleware,
  validationMiddleware(postValidation),
  postController.update
);

// export default router;
export { router as postRouter };
