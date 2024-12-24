import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

// upload video
const uploadVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body; 

  if (
    // advanced error handling
    [title, description].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (!req.files.videoFile || !req.files.thumbnail) {
    throw new ApiError(400, "Video and thumbnail file is required");
  }

  const videoFilePath = req.files?.videoFile[0]?.path;
  const thumbnailFilePath = req.files?.thumbnail[0]?.path;

  const videoFile = await uploadOnCloudinary(videoFilePath);
  const thumbnail = await uploadOnCloudinary(thumbnailFilePath);

  if (!videoFile || !thumbnail) {
    throw new ApiError(400, "Video and thumbnail file uploaded failed");
  }

  const video = await Video.create({
    videoFile: videoFile?.url,
    thumbnail: thumbnail?.url,
    title,
    description,
    owner: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, "Video uploaded successfully", video));
});

// update video
const updateVideo = asyncHandler(async (req, res) => {
  // only owner can update the video
  try {
    const videoId = req.params.id;
    const { title, description } = req.body;

    const video = await Video.findById(videoId);

    if (!video) {
      throw new ApiError(404, "Video not found");
    }

    let thumbnailUrl = video.thumbnail;

    if (req.file?.path) {
      // delete previous thumbnail
      const prevThumbnail = video.thumbnail.split("/").slice(-1)[0].split(".")[0];
      if (prevThumbnail) {
        await cloudinary.uploader.destroy(prevThumbnail);
      }

      const thumbnailPath = req.file.path;
      const thumbnail = await uploadOnCloudinary(thumbnailPath);

      if (!thumbnail) {
        throw new ApiError(400, "Thumbnail file upload failed");
      }

      thumbnailUrl = thumbnail.url;
    }

    const newVideo = await Video.findByIdAndUpdate(
      videoId,
      {
        title,
        description,
        thumbnail: thumbnailUrl,
      },
      { new: true }
    );

    return res
      .status(200)
      .json(new ApiResponse(200, "Video updated successfully", newVideo));
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while updating video details"
    );
  }
});

// delete video
const deleteVideo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const video = await Video.findById(id);

  // only owner can delete the video
  if (video && video.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(401, "Unauthorized to delete this video");
  }

  const videoDelete = await Video.findByIdAndDelete(id);

  if (!video) {
    throw new ApiError(404, "Can't find the video");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Video deleted", videoDelete));
});
 

// get the video
const getVideo = asyncHandler(async (req, res) => {
  const videoId = req.params.id; 
  if (!videoId) {
    throw new ApiError(500, "Can't find id");
  }
  //populating the owner details
  const video = await Video.findById(videoId).populate(
    "owner",
    "username fullName email avatar"
  );

  if (!video) {
    throw new ApiError(500, "Can't find video from database");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Video found successfully", video));
});

// getting all the videos in home page
const allVideos = asyncHandler(async (req, res) => {
  const videos = await Video.find({}).populate(
    "owner",
    "username fullName email avatar"
  );
  if (!videos) {
    throw new ApiError(500, "can't find videos")
  }
  return res 
    .status(200)
    .json(new ApiResponse(200, "Getting all videos", videos))

});

export { uploadVideo, updateVideo, getVideo, deleteVideo, allVideos };
