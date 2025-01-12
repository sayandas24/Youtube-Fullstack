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

const likeTweet = asyncHandler(async (req, res) => {
    const tweetId = req.params.id;
    const owner = req.user._id;

    const existingTweetLike = await Like.findOne({
        tweetLike: tweetId,
        likedBy: owner
    });

    if (existingTweetLike) {
        return res
            .status(400)
            .json(new ApiResponse(400, existingTweetLike, "Already liked to this tweet"));
    }

    const newTweetLike = await Like.create({
        tweetLike: tweetId,
        likedBy: owner
    });

    return res.status(200).json({
        success: true,
        message: "Tweet liked successfully",
        data: newTweetLike
    })
})

const tweetDislike = asyncHandler(async (req, res) => {
    const tweetId = req.params.id;
    const owner = req.user._id;

    const deletedTweetLike = await Like.findOneAndDelete({
        tweetLike: tweetId,
        likedBy: owner
    });

    if (!deletedTweetLike) {
        throw new ApiError(400, "The tweet is not liked yet");
    }

    return res.status(200).json({
        success: true,
        message: "Tweet disliked successfully",
        data: deletedTweetLike
    })
})

const videoCommentLike = asyncHandler(async (req, res) => {
    const commentId = req.params.commentId;
    const owner = req.user._id;

    const existingCommentLike = await Like.findOne({
        // videoLike: videoId,
        videoCommentLike: commentId,
        likedBy: owner
    });

    if (existingCommentLike) {
        return res
            .status(400)
            .json(new ApiResponse(400, existingCommentLike, "Already liked to this comment"));
    }

    const newCommentLike = await Like.create({
        // videoLike: videoId,
        videoCommentLike: commentId,
        likedBy: owner
    });

    return res.status(200).json({
        success: true,
        message: "Comment liked successfully",
        data: newCommentLike
    })
})

const videoCommentDislike = asyncHandler(async (req, res) => {
    
    const commentId = req.params.commentId;
    const owner = req.user._id;

    const deletedCommentLike = await Like.findOneAndDelete({
         
        videoCommentLike: commentId,
        likedBy: owner
    });

    if (!deletedCommentLike) {
        throw new ApiError(400, "The comment is not liked yet");
    }

    return res.status(200).json({
        success: true,
        message: "Comment disliked successfully",
        data: deletedCommentLike
    })
})

export { likeVideo, videoDislike, likeTweet, tweetDislike, videoCommentLike, videoCommentDislike }