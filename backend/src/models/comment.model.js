import mongoose, {Schema} from "mongoose";

const commentSchema = new Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    videoDetails: {
        type: mongoose.Types.ObjectId,
        ref: "Video"
    },
    // tweetComment: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Tweet"
    // },
    content: {
        type: String,
        require: true
    },
}, {timestamps: true}) 

export const Comment = mongoose.model("Comment", commentSchema)