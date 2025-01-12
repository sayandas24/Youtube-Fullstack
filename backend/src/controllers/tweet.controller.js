import { Tweet } from "../models/tweet.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";


const createTweet = asyncHandler(async (req, res) => {
    const { content } = req.body;

    if (req.file?.path) {
        const tweetImageLocalPath = req.file?.path;
        const tweetImage = await uploadOnCloudinary(tweetImageLocalPath);

        const newTweetWithImage = await Tweet.create({
            owner: req.user._id,
            content: content,
            contentImage: tweetImage.url
        });

        return res
            .status(200)
            .json(new ApiResponse(200, newTweetWithImage, "Tweet added"));
    }


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
    const findTweet = await Tweet.findOne({
        _id: tweetId,
        owner: owner,
    });

    if (findTweet.contentImage) {
        await cloudinary.uploader.destroy(findTweet.contentImage.split("/").slice(-1)[0].split(".")[0]);
    }

    const deletedTweet = await Tweet.findOneAndDelete({
        _id: tweetId,
        owner: owner,
    })



    return res
        .status(200)
        .json(new ApiResponse(200, "Tweet deleted successfully", deletedTweet));
})

const getAllTweets = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const currentUserId = req.user._id;
    console.log(req.user._id)

    const allTweets = await Tweet.aggregate([
        { 
            $match: {
                owner: new mongoose.Types.ObjectId(id)
            }
        }, 
        { 
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "tweetLike",
                as: "likes"
            }
        }, 
        { 
            $addFields: {
                likesCount: { $size: "$likes" },
                isCurrentUserLiked: {
                    $in: [new mongoose.Types.ObjectId(currentUserId), "$likes.likedBy"]
                }
            }
        },
        { 
            $project: {
                _id: 1,
                owner: 1,
                content: 1,
                contentImage: 1,
                createdAt: 1,
                updatedAt: 1,
                likesCount: 1,
                isCurrentUserLiked: 1
            }
        } 
    ]);

    if (!allTweets) {
        throw new ApiError(404, "Can't find tweets");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, allTweets, "All tweets"));
})

export { createTweet, deleteTweet, getAllTweets }