import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { View } from "../models/view.model.js";

const viewVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!req.user) {
        console.log("no user found for view")
        return res
            .status(200)
            .json(new ApiResponse(200, "User not registered for view"))
    }

    const existingUserViewed = await View.findOne({ videoDetails: videoId, viewedBy: req.user._id })
    if (existingUserViewed) {
        return res
            .status(400)
            .json(new ApiResponse(400, existingUserViewed, "Already viewed to this video"));
    }

    const newUserViewed = await View.create({
        videoDetails: videoId,
        viewedBy: req.user._id
    })

    if (newUserViewed) {
        return res
            .status(200)
            .json(new ApiResponse(200, newUserViewed, "View Added"))
    }


})

export { viewVideo }