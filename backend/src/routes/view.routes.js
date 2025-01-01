import { Router } from "express"; 
import { viewVideo } from "../controllers/view.controller.js";
import { optionalVerifyJWT } from "../middlewares/optionalJWT.middleware.js"; 

const router = Router()

router.route("/video/:videoId").get(optionalVerifyJWT, viewVideo)

export default router