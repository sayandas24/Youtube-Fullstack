import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { View } from "../models/view.model.js";
import { User } from "../models/user.model.js";

const viewVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!req.user) {

        return res
            .status(200)
            .json(new ApiResponse(200, "User not registered for view"))
    }
    if (req.user) {
        await User.findByIdAndUpdate(
            req.user._id,
            { $addToSet: { watchHistory: videoId } },// $addToSet ensures no duplicates
            { new: true }
        );
    }

    // Fetch the updated user with populated watchHistory
    const updatedUser = await User.findById(req.user._id).populate('watchHistory');

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