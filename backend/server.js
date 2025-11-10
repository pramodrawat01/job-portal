import express from "express";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import cors from 'cors'
import dbConnect from "./db/db.js";
import userRoutes from "./routes/user.js";
import { errorHandler } from "./middlewares/errorHandler.js";


const app = express()
dotenv.config()
dbConnect()
const PORT = process.env.PORT

app.use(
    cors({
        origin : "http://localhost:5173",
        credentials :true,
    })
)

app.use(express.json())
app.use(cookieParser())

app.use('/v1/', userRoutes)




app.use((req, res, next)=>{
    const err = new Error(`Route not found -${req.originalUrl}`)
    err.status = 404;
    next(err)
})
// Global error handler
app.use(errorHandler)



app.listen( PORT,()=>{
    console.log(`server started at ${PORT}`)
})








{/**
    jwt - bast64 encoded not encrypted means anyone can see what info jwt token contaning 

    jwt sigunature : there server takes the header and payload, combine them and create a cryptographic hash using a securet key this has become the signature

    now even a single character mismatched in payload, the signature won't match


    errors in e-com project
    failed to send otp + add to cart product says login first 
*/}