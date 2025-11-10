import validator from 'validator'
import bcrypt from 'bcrypt'
import User from '../models/user.js';
import jwt from 'jsonwebtoken'


export const registerUser = async (req, res, next) => {
    try {
        
        const { name, email, password, role } = req.body;
      
        if (!name || !email || !password || !role) {
          const err = new Error("Fill all details first to register !");
          err.status = 400;
          throw err;
          
        }
      
        if (!validator.isStrongPassword(password)) {
            const err = new Error("Password must be strong (include uppercase, lowercase, number & special char)")
            err.status = 400
            throw err
        }

        // check user already exist or not
        const existingUser = await User.findOne({email})
        if(existingUser){
            const err = new Error("Email already registered!")
            err.status = 400
            throw err
        }
      
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is solting round
        
        const user = new User({
          name,
          email,
          hashedPassword,
          role,
          step1Completed : true
        });
      
        await user.save();
      
        res.status(201).json({
            success : true,
            message: "registerd a new user successfully !",
            user : {
                id : user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                step1Completed : true
            }
        });
      
    } catch (error) {
        next(error)
    }
};

export const loginUser = async (req, res) => {
    const {user} = req.body;
    try {
    
        const token = jwt.sign(
            {id : user._id},
            process.env.JWT_REFRESH_TOKEN_KEY,
            {expiresIn : '7d'}
        )
    
        res
            .cookie("token", token)
            .status(200)
            .json({
                message : "logged in successfully",
                isAdmin : false,
                user : {
                    id : user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    step1Completed : true
                }
            })
        
    } catch (error) {
        throw error
    }
    
}