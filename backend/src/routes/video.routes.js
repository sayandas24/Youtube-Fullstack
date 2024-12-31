import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { uploadVideo, updateVideo, getVideo, deleteVideo, allVideos } from "../controllers/video.controller.js";
import { optionalVerifyJWT } from "../middlewares/optionalJWT.middleware.js";
optionalVerifyJWT

const router = Router();

router.route("/upload").post(
  verifyJWT,
  upload.fields([
    {
      name: "videoFile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  uploadVideo
);

// update video by id
router
  .route("/update/:id")
  .patch(verifyJWT, upload.single("thumbnail"), updateVideo);

// get the video by id

router.route("/p/:id").get(optionalVerifyJWT, getVideo) 

// delete video by id
router.route("/delete/:id").delete(verifyJWT, deleteVideo)

// get all the videos in home page
router.route("/").get(allVideos)

export default router;
