import mongoose, { Schema } from "mongoose";
import validator from 'validator'

const educationSchema = new Schema({
    highestQualification : {
        type : String,
    },
    courseName: { type: String },
    courseType: { type: String },
    specialization: { type: String },
    university: { type: String},
    startingYear: { type: Number },
    passingYear: { type: Number },
    gpaOutOf10: { type: Number, min: 0, max: 10 },
    keySkills: [{ type: String }],
})

const experienceSchema = new Schema({
    resumeHeadline: { type: String },
    preferredLocations: [{type : String, maxlength : 10}],
    preferredSalary: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    resume: { type: String }, // resume file URL or path
    portfolioLink: { type: String },
})

const userSchema = new Schema({
    name : {
        type : String,
        required : [true, "Name is required"],
        trim : true

    },
    email : {
        type :String,
        required : [true, "Email is required"],
        lowercase : true,
        unique : true,
        validate : [validator.isEmail, "please enter valid email address"]
    },
    hashedPassword : {
        type : String,
        required : [true, "password is required"],
        minlength : [6, "password must be at least 6 characters long"]
    },
    role : {
        type : String,
        enum : ["fresher", "experienced"],
        required : true
    },
    education : educationSchema,
    experience : experienceSchema, 

    // Step progress flags
    step1Completed: { type: Boolean, default: false },
    step2Completed: { type: Boolean, default: false },
    step3Completed: { type: Boolean, default: false },
    profileCompleted: { type: Boolean, default: false },

},
    {
        timestamps : true
    }
)

const User = mongoose.model("Users", userSchema)
export default User