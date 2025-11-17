import User from "../models/user.js"

export const verifyOtp = async(req, res)=>{
    const {otp, id} = req.body

    if(!id || !otp){
        const err = new Error('otp and user id is required')
        err.status(401)
        throw err
    }

    const user = await User.findById(id)
    if(!user){
        const err = new Error('user not exist')
        err.status = 404
        throw err
    }
    
    user.step1Completed = true
    await user.save()

    res.status(200).json({
        success : true,
        message : 'otp verified successfully',
        user : {
            id : user._id,
            step1Completed : true,
        }
        
    })

}