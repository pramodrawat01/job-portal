import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

// console.log("EMAIL_USER: in util", process.env.EMAIL_USER);
// console.log("EMAIL_PASS:", process.env.EMAIL_PASS);


const transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : process.env.EMAIL_USER ,
        pass : process.env.EMAIL_PASS
    }
});

export const sendMail = async (email, otp) => {
    await transporter.sendMail({
        from : process.env.EMAIL_USER,
        to : email,

        subject : "JobSpot Email verification",
        html : `
            <h2>Email Verification</h2>
            <p>Your OTP is:</p>

            <h1>${otp}</h1>

            <p>Valid for 5 minutes.</p>
        `
    })
}