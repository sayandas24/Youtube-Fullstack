import mongoose, {Schema} from "mongoose";

const viewSchema = new Schema({
    viewedBy:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    videoDetails: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    }
})

export const View = mongoose.model("View", viewSchema)