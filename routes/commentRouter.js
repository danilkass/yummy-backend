import { Router } from "express";
import { Controller as CommentController } from "../controllers/commentController.js";
const router = new Router();

router.post("/", CommentController.create);
router.get("/", CommentController.get);
router.delete("/", CommentController.delete);
router.patch("/", CommentController.update);

// export default router;
export { router as commentRouter };
