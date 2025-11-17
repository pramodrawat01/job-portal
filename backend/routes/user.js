import { Router } from "express";
import { loginUser, registerEducation, registerUser } from "../controllers/user.js";
import asyncHandler from "../utils/asyncHandler.js";
import verifyPassword from "../middlewares/passwordVerification.js";
import upload, { multerErrorHandler } from "../middlewares/multer.js";

const userRoutes = Router()

userRoutes.post('/register', asyncHandler(registerUser))
userRoutes.post('/register/education', upload.single('resume'), multerErrorHandler, asyncHandler(registerEducation))

userRoutes.post('/login', asyncHandler(verifyPassword) , asyncHandler(loginUser))

export default userRoutes