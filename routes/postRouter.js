import { Router } from "express";
import { Controller as postController } from "../controllers/postController.js";

const router = new Router();

router.post("/", postController.create);
router.get("/", postController.getAll);
router.get("/:id", postController.getOne);
router.delete("/", postController.delete);
router.patch("/", postController.update);

// export default router;
export { router as postRouter };
