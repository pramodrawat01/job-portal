import validator from 'validator'
import bcrypt from 'bcrypt'
import User from '../models/user.js';
import jwt from 'jsonwebtoken'


export const registerUser = async (req, res, next) => {
    try {
        
        const { name, email, password, workStatus } = req.body;
        // console.log(req.body)
        if (!name || !email || !password || !workStatus) {
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
          workStatus,
        //   step1Completed : true
        });
      
        await user.save();
      
        res.status(201).json({
            success : true,
            message: "registerd a new user successfully !",
            user : {
                id : user._id,
                name: user.name,
                email: user.email,
                workStatus: user.workStatus,
                // step1Completed : true
            }
        });
      
    } catch (error) {
        next(error)
    }
};


export const registerEducation = async(req, res, next) => {
    const { id, highest_qualification, course, course_type, specialization, university, starting_year, passing_year, cgpa, key_skills, resume, portfolio} = req.body.fd

    if(!highest_qualification || !course || !course_type || !specialization || !university || !starting_year || !passing_year || !key_skills || !resume){
        const err = new Error("require fields are missings...!")
        err.status = 401
        throw err
    }

    let resumeUrl = " ";
    if(req.file){
        const result =  await cloudinary.uploader.upload(req.file.path, {
            folder : 'uploads'
        })

        resumeUrl = result.secure_url
        fs.unlink(req.file.path, (err)=>{
            console.log(err)
        })
    }

    




}

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
                    workStatus: user.workStatus,
                    // step1Completed : true
                }
            })
        
    } catch (error) {
        throw error
    }
    
}