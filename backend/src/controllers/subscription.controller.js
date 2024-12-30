import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Subscription } from "../models/subscription.model.js";

// get subscribers
const subscribeUser = asyncHandler(async (req, res) => {
    // Check if the user is already subscribed to the channel
    const existingSubscription = await Subscription.findOne({
        subscriber: req.user._id,
        channel: req.params.id
    });

    if (existingSubscription) {
        return res.status(400).json(new ApiResponse(400, existingSubscription, "Already subscribed to this channel"));
    }

    // Create a new subscription
    const newSubscription = await Subscription.create({
        subscriber: req.user._id,
        channel: req.params.id
    });

    return res
        .status(200)
        .json(new ApiResponse(200, newSubscription, "Subscription created successfully", newSubscription));
});

// unsubscribe
const unsubscribeUser = asyncHandler(async (req, res) => {
    const subscription = await Subscription.findOneAndDelete({
        subscriber: req.user._id,
        channel: req.params.id
    });

    if (!subscription) {
        throw new ApiError(400, "You are not subscribed to this channel");
    }

    return res.status(200).json(new ApiResponse(200, subscription, "Subscription deleted successfully", subscription));
});


export { subscribeUser, unsubscribeUser }