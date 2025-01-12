import { likeTweet, likeVideo, tweetDislike, videoDislike, videoCommentLike, videoCommentDislike } from "../controllers/like.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/like-video/:id").get(verifyJWT, likeVideo)
router.route("/dislike-video/:id").get(verifyJWT, videoDislike)

router.route("/video-comment-like/:commentId").get(verifyJWT, videoCommentLike)
router.route("/video-comment-dislike/:commentId").get(verifyJWT, videoCommentDislike)

router.route("/like-tweet/:id").get(verifyJWT, likeTweet);
router.route("/dislike-tweet/:id").get(verifyJWT, tweetDislike);

export default router