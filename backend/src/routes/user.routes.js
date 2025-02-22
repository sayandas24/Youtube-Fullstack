import { Router } from "express";
import {
    getAllUsers,
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    updateUserAvatar,
    updateUserCoverImage,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    getUserChannelProfile,
    getWatchHistory,
    authentication,
    removeVideoFromWatchHistory
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { optionalVerifyJWT } from "../middlewares/optionalJWT.middleware.js";


const router = Router()

router.route("/users").get(getAllUsers)
router.route("/authentication").post(authentication)

router.route("/register").post(
    upload.fields([
        {
            name: "avatar", // multer image passing from frontend
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
) // calling the registerUser function in controller user.controller

router.route("/login").post(loginUser)

// secure route - first run the verifyJWT then next() then run the logoutUser
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)

router.route("/avatar-new").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/cover-new").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

router.route("/channel/:username").get(optionalVerifyJWT ,getUserChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory)
router.route("/history/:videoId").delete(verifyJWT, removeVideoFromWatchHistory)

export default router;