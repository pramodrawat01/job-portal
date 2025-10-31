import { createSlice } from "@reduxjs/toolkit";
import { SiSlickpic } from "react-icons/si";

const signupSlice = createSlice({
    name : "signup", 
    initialState : {
        profile: {
            name: "Pramod Singh Rawat",
            email: "rawatpramod@gmail.com",
            phone: "5489238855",
            education: [],
            experience: [],
            skills: [],
            resume: "",
            profilePic: "",
            socialLinks: {},
            jobProfile : ["frontend developer", "react developer"]
        },
    },
    reducers : {
        userSignup : (state, action) =>{
            return {

            }
        }
    }
})


export const {userSignup} = signupSlice.actions
export default signupSlice.reducer

