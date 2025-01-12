import { Tweet } from "../models/tweet.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
    const { content } = req.body;
    console.log(content)
    if (!content) {
        throw new ApiError(400, "content is required to add tweet");
    }

    const newTweet = await Tweet.create({
        owner: req.user._id,
        content: content,
    });

    if (!newTweet) {
        throw new ApiError(400, "tweet not added");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, newTweet, "Tweet added"));
})

const deleteTweet = asyncHandler(async (req, res) => { 
    const owner = req.user._id; // Current user ID
    const tweetId = req.params.id; // Tweet ID to delete

    if (!tweetId) {
        throw new ApiError(400, "Tweet ID is required");
    }
    const deletedTweet = await Tweet.findOneAndDelete({
        _id: tweetId,
        owner: owner,
    })
    return res
        .status(200)
        .json(new ApiResponse(200, "Tweet deleted successfully", deletedTweet));
})

export { createTweet, deleteTweet }