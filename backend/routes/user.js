import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.js";
import asyncHandler from "../utils/asyncHandler.js";
import verifyPassword from "../middlewares/passwordVerification.js";

const userRoutes = Router()

userRoutes.post('/register', asyncHandler(registerUser))
userRoutes.post('/login', asyncHandler(verifyPassword) , asyncHandler(loginUser))

export default userRoutes