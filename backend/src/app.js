// THIS APP FILE FOR DEFINING MIDDLEWARE AND EXPORTING IT TO INDEX.JS
import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

// defining cors (with middleware) with origin (frontend access)
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))  


app.use(express.json({ limit: "16kb" })) // middleware to accept limited json data 
app.use(express.urlencoded({ extended: true })) // middleware to accept url encoded data from form or url
app.use(express.static("public")) // send static public files to frontend
app.use(cookieParser()) // middleware to store the user cookie to perform CRUD operations


// routes import 
import userRouter from "./routes/user.routes.js"
import videoRouter from "./routes/video.routes.js"
import subscriptionRouter from "./routes/subscription.routes.js"
import likeRouter from "./routes/like.routes.js"
import commentRouter from "./routes/comment.routes.js"
import viewRouter from "./routes/view.routes.js"

// routes declaration
app.use("/api/v1/user", userRouter) // passing the control to user.router.js
// localhost:8000/api/v1/users/register
app.use("/api/v1/video", videoRouter)
// localhost:8000/api/v1/videos/upload
app.use("/api/v1/subscription", subscriptionRouter)
app.use("/api/v1/like", likeRouter)
app.use("/api/v1/comment", commentRouter)
app.use("/api/v1/view", viewRouter)

export { app }