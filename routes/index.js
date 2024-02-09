import { Router } from "express";
const router = new Router();

import { router as userRouter } from "./userRouter.js";
import { router as postRouter } from "./postRouter.js";
import { router as commentRouter } from "./commentRouter.js";
import { router as subscribeRouter } from "./subscribeRouter.js";
import { router as savesRouter } from "./savesRouter.js";
import { router as postReactionRouter } from "./postReactionRouter.js";
import { router as commentReactionRouter } from "./commentReactionRouter.js";

router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/comment", commentRouter);
router.use("/subscribe", subscribeRouter);
router.use("/saves", savesRouter);
router.use("/postreaction", postReactionRouter);
router.use("/commentreaction", commentReactionRouter);

export default router;
