// import { createSlice } from "@reduxjs/toolkit";
// import { SiSlickpic } from "react-icons/si";

// const signupSlice = createSlice({
//     name : "signup", 
//     initialState : {
//         profile: {
//             name: "Pramod Singh Rawat",
//             email: "rawatpramod@gmail.com",
//             phone: "5489238855",
//             education: [],
//             experience: [],
//             skills: [],
//             resume: "",
//             profilePic: "",
//             socialLinks: {},
//             jobProfile : ["frontend developer", "react developer"]
//         },
//     },
//     reducers : {
//         userSignup : (state, action) =>{
//             return {

//             }
//         }
//     }
// })


// export const {userSignup} = signupSlice.actions
// export default signupSlice.reducer





import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id : "",
    name: "",
    email: "",
    password: "", // plain password for frontend only; backend will hash it
    workStatus: "", // fresher / experienced
    education: {
      highestQualification: "",
      courseName: "",
      courseType: "",
      specialization: "",
      university: "",
      startingYear: "",
      passingYear: "",
      gpaOutOf10: "",
      keySkills: [],
    },
    experience: {
      resumeHeadline: "",
      preferredLocations: [],
      preferredSalary: "",
      gender: "",
      resume: "",
      portfolioLink: "",
    },
    step1Completed: false,
    step2Completed: false,
    step3Completed: false,
    profileCompleted: false,
  },
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    // update personal info
    updatePersonalInfo: (state, action) => {
      const { name, email, id,  workStatus } = action.payload;
      state.user.name = name;
      state.user.email = email;
      state.user.id = id;
      state.user.workStatus = workStatus;
    },
    verifyOtp : (state, action)=>{
        state.user.step1Completed  = true
    },

    // update education
    updateEducation: (state, action) => {
      state.user.education = { ...state.user.education, ...action.payload };
      state.user.step2Completed = true;
    },

    // update experience
    updateExperience: (state, action) => {
      state.user.experience = { ...state.user.experience, ...action.payload };
      state.user.step3Completed = true;
    },

    // mark full profile as complete
    completeProfile: (state) => {
      state.user.profileCompleted = true;
    },

    // reset after logout
    resetSignup: () => initialState,
  },
});

export const {
  updatePersonalInfo,
  updateEducation,
  updateExperience,
  completeProfile,
  resetSignup,
  verifyOtp,
} = signupSlice.actions;

export default signupSlice.reducer;
