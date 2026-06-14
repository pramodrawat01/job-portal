import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema({
    email : {
        type : String,
        required : true,
    },
    otp : {
        type : String,
        required : true,
    },
    expireAt : {
        type : Date,
        required : true,
    }

}, {
    timestamps : true,
})

const Otp = mongoose.model("Otp", otpSchema)          // Otps is going to be the collection name
export default Otp

/****
 * 
 * function Schema(data : {email : {}}){
 *  
 * }
 * 
 */