
import Router from 'express'
import { verifyOtp } from '../controllers/otp.js'
import asyncHandler from '../utils/asyncHandler.js'

const otpRoutes = Router()

// otpRoutes.post('/send_otp')
otpRoutes.post('/verify_otp', asyncHandler(verifyOtp) )
export default otpRoutes