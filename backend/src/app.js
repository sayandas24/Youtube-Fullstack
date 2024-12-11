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

// routes declaration
app.use("/api/v1/users", userRouter) // passing the control to user.router.js
// localhost:8000/api/v1/users/register
app.use("/api/v1/videos", videoRouter)
// localhost:8000/api/v1/videos/upload

export { app }