import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const optionalVerifyJWT = asyncHandler(async (req, _, next) => {
  try {
    // Retrieve the token from cookies or Authorization header
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    // If no token is present, proceed without authentication
    if (!token) {
      return next();
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Find the user associated with the token
    const user = await User.findById(decodedToken?.id).select("-password -refreshToken");

    // If user is not found, proceed without setting req.user
    if (!user) {
      return next();
    }

    // Attach the authenticated user to the request object
    req.user = user;
    next();
  } catch (error) {
    // If there's any error in token verification, proceed without authentication
    next();
  }
});
