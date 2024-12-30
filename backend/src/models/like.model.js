import mongoose, { Schema } from "mongoose";

const LikeSchema = new Schema({
    videoLike: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
    likedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    // tweet, comment :TODO
}, { timestamps: true })

export const Like = mongoose.model("Like", LikeSchema)