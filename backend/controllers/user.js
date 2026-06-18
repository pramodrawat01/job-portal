import validator from 'validator'
import bcrypt from 'bcrypt'
import User from '../models/user.js';
import jwt from 'jsonwebtoken'
import cloudinary from '../config/cloudinary.js';
import fs from "fs"

/// send safeObject to frontend which does not include importent credentials
export const getMe = async(req, res) => {

    if (!req.user) {
        return res.status(401).json({ success: false, message: "Not logged in" });
    }

    res.status(200).json({
        success: true,
        user: req.user,
    });
}

// register user 
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

        const token = jwt.sign(
            {id : user._id},
            process.env.JWT_SECRET,
            {expiresIn : '7d'}
        )
      
        res
        .cookie("token", token , {
            httpOnly : true,
            secure : false,
            sameSite : "lax"
        })
        .status(201).json({
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

// add education details in user's profile
export const registerEducation = async(req, res, next) => {
    const userId = req.user.id
    const {
        highest_qualification, 
        course, 
        course_type, 
        specialization, 
        university, 
        starting_year, 
        passing_year, 
        cgpa, 
        key_skills, 
        portfolio
    } = req.body

    if(!highest_qualification || !course || !course_type || !specialization || !university || !starting_year || !passing_year || !key_skills ){
        const err = new Error("require fields are missings...!")
        err.status = 401
        throw err
    }

    const user = await User.findById(userId)
    if(!user){
        return res.status(404).json({
            success : false, 
            message : "User not found !"
        })
    }

    let resumeUrl = " ";
    if(req.file){
       
        const result =  await cloudinary.uploader.upload(req.file.path, {
            resource_type: "raw",
            folder : 'uploads'
        })

        resumeUrl = result.secure_url
        fs.unlink(req.file.path, (err)=>{
            console.log(err)
        })
    }

    // save user's education info
    user.education = {
        highestQualification: highest_qualification,
        courseName: course,
        courseType: course_type,
        specialization,
        university,
        startingYear: Number(starting_year),
        passingYear: Number(passing_year),
        gpaOutOf10: Number(cgpa),
        keySkills : 
            typeof key_skills === "string"
            ? key_skills.split(",").map((s) => s.trim())
            : []
    }

    if (!user.experience) {
        user.experience = {};
    }

    if(portfolio){
        user.experience.portfolioLink = portfolio
    } 
        
    if(resumeUrl){
        console.log(resumeUrl, 'resume url')
        user.experience.resume = resumeUrl
    }
    user.step2Completed = true
    await user.save()

    return res.status(200).json({
        success: true,
        message: "Education saved successfully",
        user
    });

}

// add preferences details
export const registerPreferences = async (req, res, next) => {
    const userId = req.user.id;

    const {
        resumeHeadline,
        preferredLocations,
        preferredSalary,
        gender,
    } = req.body

    const user = await User.findById(userId)

    if(!user){
        return res.status(404).json({
            success : false,
            message : "user not found"
        })
    }

    if(!user.experience){
        user.experience = {}
    }
    user.experience.resumeHeadline = resumeHeadline;
    user.experience.preferredLocations = preferredLocations;
    user.experience.preferredSalary = preferredSalary;
    user.experience.gender = gender;

    user.step3Completed = true;
    if (
        user.step1Completed &&
        user.step2Completed &&
        user.step3Completed
    ) {
        user.profileCompleted = true;
    }

    await user.save();

    return res.status(200).json({
        success: true,
        message: "Preferences saved successfully",
        user,
    });
}

// login user with credintials
export const loginUser = async (req, res) => {
    const {user} = req.body;
    try {
    
        const token = jwt.sign(
            {id : user._id},
            process.env.JWT_SECRET,
            {expiresIn : '7d'}
        )
    
        res
            .cookie("token", token, {
                httpOnly: true,
                secure: false, // true in production
                sameSite: "lax",
            })
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