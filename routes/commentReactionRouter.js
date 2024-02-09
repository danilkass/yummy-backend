import { Router } from "express";
import { Controller as CommentReactionController } from "../controllers/commentReactionController.js";

const router = new Router();

router.post("/", CommentReactionController.create);
router.patch("/", CommentReactionController.update);
router.delete("/", CommentReactionController.delete);

// export default router;
export { router };
