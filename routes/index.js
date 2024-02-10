import { Router } from "express";
const router = new Router();

import { userRouter } from "./userRouter.js";
import { postRouter } from "./postRouter.js";
import { commentRouter } from "./commentRouter.js";
import { subscribeRouter } from "./subscribeRouter.js";
import { savesRouter } from "./savesRouter.js";
import { postReactionRouter } from "./postReactionRouter.js";
import { commentReactionRouter } from "./commentReactionRouter.js";

router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/comment", commentRouter);
router.use("/subscribe", subscribeRouter);
router.use("/saves", savesRouter);
router.use("/post/reaction", postReactionRouter);
router.use("/comment/reaction", commentReactionRouter);

export default router;
