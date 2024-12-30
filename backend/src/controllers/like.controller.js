import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Like } from "../models/like.model.js"

const likeVideo = asyncHandler(async (req, res) => {
    const videoId = req.params.id

    const existingVideoLike = await Like.findOne({
        videoLike: videoId,
        likedBy: req.user._id
    })
    if (existingVideoLike) {
        return res
            .status(400)
            .json(new ApiResponse(400, existingVideoLike, "Already liked to this video"));
    }
    const newVideoLike = await Like.create({
        videoLike: videoId,
        likedBy: req.user._id
    })


    return res
        .status(200)
        .json(new ApiResponse(200, newVideoLike, "video liked by user"))
})

const videoDislike = asyncHandler(async(req, res) => {
    const videoId = req.params.id

    const deleteLike = await Like.findOneAndDelete({
        videoLike: videoId,
        likedBy: req.user._id
    })

    if (!deleteLike) {
        throw new ApiError(400, "The video is not liked yet")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, deleteLike, "Disliked the video"))
})

export { likeVideo, videoDislike }