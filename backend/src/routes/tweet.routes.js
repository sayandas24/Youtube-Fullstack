import { Router } from "express";
import { createTweet, deleteTweet } from "../controllers/tweet.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, createTweet);
router.route("/delete-tweet/:id").delete(verifyJWT, deleteTweet);


export default router;