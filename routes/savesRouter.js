import { Router } from "express";
import { Controller as SavesController } from "../controllers/savesController.js";
const router = new Router();

router.post("/", SavesController.create);
router.get("/", SavesController.get);
router.delete("/", SavesController.delete);

// export default router;
export { router as savesRouter };
