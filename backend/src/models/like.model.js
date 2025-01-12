import mongoose, { Schema } from "mongoose";

const LikeSchema = new Schema({
    videoLike: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
    tweetLike: {
        type: Schema.Types.ObjectId,
        ref: "Tweet"
    },
    videoCommentLike: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },
    likedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    // tweet, comment :TODO
}, { timestamps: true })

export const Like = mongoose.model("Like", LikeSchema)