import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import AuthRoute from "./routes/auth.js"
import HotelsRoute from "./routes/hotels.js"
import cookieParser from "cookie-parser"
import RoomsRoute from "./routes/rooms.js"
import UsersRoute from "./routes/users.js"
import cors from "cors"

const app = express()
dotenv.config()

const connect =  ()=>{
    mongoose.connect(process.env.MONGO_URL)
    console.log("connected to mongodb")
    }

//middlewear
app.use(cors({
    origin: "http://localhost:5173",
    credentials:  true,
}))
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", AuthRoute)
app.use("/api/hotels", HotelsRoute)
app.use("/api/rooms", RoomsRoute)
app.use("/api/users", UsersRoute)

app.use((err,req,res,next)=>{
    const errstatus = err.status || 500
    const errmessage = err.message || "something went wrong"
    return res.status(errstatus).json({
        success: false,
        status: errstatus,
        message: errmessage,
        // stack: err.stack 
    })
})
app.listen(process.env.PORT, ()=>{
    connect()
    console.log(`backend connected ${process.env.PORT}`)
})