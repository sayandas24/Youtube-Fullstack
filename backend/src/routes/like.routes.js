import { likeVideo, videoDislike } from "../controllers/like.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/like-video/:id").get(verifyJWT, likeVideo)
router.route("/dislike-video/:id").get(verifyJWT, videoDislike)

export default router