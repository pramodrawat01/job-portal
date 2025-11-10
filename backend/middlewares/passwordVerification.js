import User from "../models/user.js";
import bcrypt from 'bcrypt'

const verifyPassword = async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password){
        const err = new Error("Please enter all details first to login")
        err.status = 400
        throw err
    }

    if(email === process.env.ADMIN_USERNAME ){
        if(password !== process.env.ADMIN_PASSWORD){
            const err = new Error("Invalid admin password")
            err.status = 401
            throw err
        }

        return res.status(201).json({
            message : "admin logged in",
            isAdmin : true
        })
    }


    const user = await User.findOne({email})
    if(!user) {
        const err = new Error("Login failed! user not found, singup first")
        err.status = 400
        throw err
    }

    if(!user.hashedPassword){
        const err = new Error("Password not found for this user.")
        err.status = 500
        throw err
    }

    const isMatch = await bcrypt.compare( password, user.hashedPassword)
    if(isMatch) {
        req.body.user = user
        next()
    }
    else{
        const err = new Error("Login failed! Invalid credentails")
        err.status = 401
        throw err
    }


}

export default verifyPassword