import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Comment } from "../models/comment.model.js"

const commentVideo = asyncHandler(async (req, res) => {

    const content = req.body.content 
    if (!content) {
        throw new ApiError(400, "content is required to add comment")
    }

    const newComment = await Comment.create({
        videoDetails: req.params.id,
        owner: req.user._id,
        content: content,
    }) 

    if (!newComment) {
        throw new ApiError(400, "comment not added in video")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, newComment, "Comment added in video"))
})

const deleteCommentVideo = asyncHandler(async (req, res) => {
    const owner = req.user._id; // Current user ID
    const commentId = req.params.commentId; // Comment ID to delete

    if (!commentId) {
        throw new ApiError(400, "Comment ID is required");
    }

    // Attempt to find and delete the comment
    const deletedComment = await Comment.findOneAndDelete({
        _id: commentId,
        owner: owner,
    });
    

    if (!deletedComment) {
        throw new ApiError(404, "Comment not found or you're not authorized to delete this comment");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "Comment deleted successfully", deletedComment));
});


export { commentVideo, deleteCommentVideo }