import { Router } from "express";
import { Controller as PostReactionController } from "../controllers/postReactionController.js";
const router = new Router();

router.post("/", PostReactionController.create);
router.patch("/", PostReactionController.update);
router.delete("/", PostReactionController.delete);

// export default router;
export { router };
