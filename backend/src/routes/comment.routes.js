import { commentVideo, deleteCommentVideo } from "../controllers/comment.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/comment-video/:id").post(verifyJWT, commentVideo)
router.route("/delete-comment-video/:commentId").delete(verifyJWT, deleteCommentVideo)

export default router