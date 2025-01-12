import { Router } from "express";
import { createTweet, deleteTweet, getAllTweets } from "../controllers/tweet.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js"
import { optionalVerifyJWT } from "../middlewares/optionalJWT.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, upload.single("tweetImage"), createTweet);
router.route("/delete-tweet/:id").delete(verifyJWT, deleteTweet);
router.route("/:id").get(optionalVerifyJWT,getAllTweets);


export default router;