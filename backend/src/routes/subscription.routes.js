import { subscribeUser, unsubscribeUser } from "../controllers/subscription.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
// import { verify } from "jsonwebtoken";

const router = Router()

router.route("/subscribe/:id").get(verifyJWT, subscribeUser) 
router.route("/unsubscribe/:id").get(verifyJWT, unsubscribeUser) 

export default router