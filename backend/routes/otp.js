
import Router from 'express'
import { sendOtp, verifyOtp } from '../controllers/otp.js'
import asyncHandler from '../utils/asyncHandler.js'

const otpRoutes = Router()

// otpRoutes.post('/send_otp')
otpRoutes.post('/send-otp', asyncHandler(sendOtp))
// verify otp
otpRoutes.post('/verify-otp', asyncHandler(verifyOtp) )
export default otpRoutes