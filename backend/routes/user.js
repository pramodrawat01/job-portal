import { Router } from "express";
import { getMe, loginUser, registerEducation, registerUser } from "../controllers/user.js";
import asyncHandler from "../utils/asyncHandler.js";
import verifyPassword from "../middlewares/passwordVerification.js";
import upload, { multerErrorHandler } from "../middlewares/multer.js";
import { auth } from "../middlewares/authMiddleware.js";

const userRoutes = Router()

userRoutes.get('/me', auth, asyncHandler(getMe))
userRoutes.post('/register', asyncHandler(registerUser))
userRoutes.post('/register/education', upload.single('resume'), multerErrorHandler, asyncHandler(registerEducation))

userRoutes.post('/login', auth,  asyncHandler(verifyPassword) , asyncHandler(loginUser))

export default userRoutes