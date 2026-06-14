import Otp from "../models/otp.js";
import User from "../models/user.js"
import { sendMail } from "../utils/sendMail.js";

export const sendOtp = async(req, res, next) => {
    const {email} = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const otp = Math.floor(
        100000 + Math.random() * 900000
    ).toString()

    await Otp.deleteMany({email});
    await Otp.create({
        email,
        otp,
        expireAt : new Date(Date.now() + 5 * 60 * 1000 ),
    })

    await sendMail(email, otp);

    res.status(200).json({
        success : true,
        message : "otp sent "
    })

}

export const verifyOtp = async(req, res)=>{
    const {otp, email} = req.body

    if(!email || !otp){
        const err = new Error('otp and email is required to verify')
        err.status = 401
        throw err
    }
    const user = await User.findOne({email})
    if(!user){
        const err = new Error('user not exist')
        err.status = 404
        throw err
    }

    const otpRecord = await Otp.findOne({email})

    if(!otpRecord){
        return res.status(404).json({
            message: "OTP not found",
        });
    }

    if(otpRecord.expireAt < new Date()){
        return res.status(400).json({
            message: "OTP expired",
        });
    }

    if(otp !== otpRecord.otp){
        return res.status(400).json({
            message: "Invalid OTP",
        });
    }

    user.isEmailVerified = true;
    user.step1Completed = true
    await user.save()

    await Otp.deleteOne({
        _id : otpRecord._id,
    })

    res.status(200).json({
        success : true,
        message : 'otp verified successfully',
        user : {
            email : user.email,
            step1Completed : true,
            isEmailVerified : user.isEmailVerified,
        }
        
    })

}