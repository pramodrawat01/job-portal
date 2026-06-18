import { Router } from "express";
import { getMe, loginUser, registerEducation, registerPreferences, registerUser } from "../controllers/user.js";
import asyncHandler from "../utils/asyncHandler.js";
import verifyPassword from "../middlewares/passwordVerification.js";
import upload, { multerErrorHandler } from "../middlewares/multer.js";
import { auth } from "../middlewares/authMiddleware.js";

const userRoutes = Router()

userRoutes.get('/me', auth, asyncHandler(getMe))    
userRoutes.post('/login',  asyncHandler(verifyPassword) , asyncHandler(loginUser))

userRoutes.post('/register', asyncHandler(registerUser))
userRoutes.post('/register/education', auth, upload.single('resume'), multerErrorHandler, asyncHandler(registerEducation))
userRoutes.post('/register/preferences', auth, asyncHandler(registerPreferences))

export default userRoutes