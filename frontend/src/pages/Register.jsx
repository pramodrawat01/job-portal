// import React, { useEffect, useState } from 'react'
// import {auth, provider} from '../firebase'
// import { signInWithPopup, signOut } from 'firebase/auth'
// import { useDispatch, useSelector } from 'react-redux'
// import { addUser, removeUser } from '../store/loginSlice'

// const Register = () => {

//   const [signedUpUser, setSignedUpUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
//   const dispatch = useDispatch()

//   const {isLoggedIn} = useSelector(state => state.login)

//   const handleSignup = async()=>{
//     let res = await signInWithPopup(auth, provider)
//     const user = res.user;
//     console.log(user)

//     setSignedUpUser(user)
//     localStorage.setItem("user", JSON.stringify(user))

//     dispatch(addUser({user}))

//   }

// // const handleSignup = async () => {
// //   try {
// //     // Firebase popup login
// //     const res = await signInWithPopup(auth, provider);
// //     const user = res.user;
// //     console.log("Logged in user:", user);

// //     // State + localStorage update
// //     setSignedUpUser(user);
// //     localStorage.setItem("user", JSON.stringify(user));

// //     // Redux store update
// //     dispatch(addUser(user));

// //     // (Optional) success message
// //     toast.success(`Welcome ${user.displayName || "User"}!`);
// //   } 
// //   catch (error) {
// //     // Popup closed by user (very common, not a real error)
// //     if (error.code === "auth/popup-closed-by-user") {
// //       console.warn("User closed the Google Sign-In popup before completing login.");
// //     } 
// //     // Popup blocked by browser
// //     else if (error.code === "auth/cancelled-popup-request") {
// //       console.warn("Popup request was cancelled, probably due to multiple clicks.");
// //     } 
// //     // Network issue or invalid setup
// //     else {
// //       console.error("Firebase login error:", error);
// //       toast.error("Login failed. Please try again.");
// //     }
// //   }
// // };


//   useEffect(()=>{
//     console.log(isLoggedIn, "logged user from store")
//   }, [isLoggedIn])

//   const handleSignout = async()=>{
//     await signOut(auth)

//     localStorage.removeItem("user")
//     setSignedUpUser(null)

//     dispatch(removeUser())

//   }


//   // useEffect(()=>{
//   //   dispatch(removeUser())
//   // }, [isLoggedIn])  

  
  

//   return (
//     <div className='mt-[100px]'>
//     <div>Register page</div>

//     {
//       signedUpUser !== null  ? 

//       <button 
//       className='border-1 px-6 py-1 rounded-sm'
//       onClick={() => handleSignout()}> signout</button>
       
//       : 
//        <button onClick={()=> handleSignup()}>signup with google</button>
//     }

      
//     </div>
//   )
// }

// export default Register














import React, { useEffect, useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../store/loginSlice";
import Step1 from "./createProfile/Step1";
import { Link, Navigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";


const Register = () => {
  const [signedUpUser, setSignedUpUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.login);

  const [passwordErr, setPasswordErr] = useState(false)
   const [selectedStatus, setSelectedStatus] = useState(null);

  const handleSignup = async () => {
    let res = await signInWithPopup(auth, provider);
    const user = res.user;
    setSignedUpUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(addUser({ user }));
  };

  const handleManualRegister = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password) {
      localStorage.setItem("user", JSON.stringify(formData));
      dispatch(addUser(formData));
      setSignedUpUser(formData);
      console.log("Registered manually:", formData);
    } else {
      alert("Please fill all fields");
    }
  };

  const handleSignout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    setSignedUpUser(null);
    dispatch(removeUser());
  };

  useEffect(() => {
    console.log(isLoggedIn, "logged user from store");
  }, [isLoggedIn]);

  return (
    // <div className="flex justify-center items-center min-h-screen bg-gradient-to-t from-green-100 via-green-50 to-white text-gray-800">
    //   <div className="bg-white shadow-lg rounded-2xl p-10 w-[380px] text-center border border-green-100">
    //     <h2 className="text-3xl font-semibold text-green-800 mb-6">
    //       Register in <span className="font-bold family-sarif">JobSpot</span>
    //     </h2>
    //     <p>already have an account ? <Link to='/login' className="text-green-800 font-semibold">login here</Link></p>

    //     {signedUpUser ? (
    //       <>
    //         <Step1/>

    //         {/* <p className="text-gray-600 mb-4">
    //           Welcome,{" "}
    //           <span className="font-medium text-green-800">
    //             {signedUpUser.displayName || signedUpUser.name || "User"}
    //           </span>
    //         </p>
    //         <button
    //           onClick={handleSignout}
    //           className="bg-green-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-all duration-200"
    //         >
    //           Sign Out
    //         </button> */}
    //       </>
    //     ) : (
    //       <>
    //         {/* Manual Register */}
    //         <form onSubmit={handleManualRegister} className="flex flex-col gap-4 mb-6">
    //           <input
    //             type="text"
    //             placeholder="Full Name"
    //             value={formData.name}
    //             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    //             className="border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
    //           />

    //           <input
    //             type="email"
    //             placeholder="Email"
    //             value={formData.email}
    //             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    //             className="border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
    //           />

    //           <input
    //             type="password"
    //             placeholder="Password"
    //             value={formData.password}
    //             onChange={(e) => setFormData({ ...formData, password: e.target.value })}
    //             className="border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
    //           />

    //           <button
    //             type="submit"
    //             className="bg-green-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-all duration-200"
    //           >
    //             Register
    //           </button>
    //         </form>

    //         <div className="flex items-center gap-2 mb-6">
    //           <div className="h-px bg-gray-300 w-full" />
    //           <span className="text-gray-500 text-sm">or</span>
    //           <div className="h-px bg-gray-300 w-full" />
    //         </div>

    //         {/* Google Signup */}
    //         <button
    //           onClick={handleSignup}
    //           className="flex items-center justify-center gap-2 bg-white border border-green-300 text-green-800 px-6 py-2 rounded-lg font-medium hover:bg-green-100 transition-all duration-200 w-full"
    //         >
    //           <img
    //             src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
    //             alt="Google"
    //             className="w-5 h-5"
    //           />
    //           Sign up with Google
    //         </button>
    //       </>
    //     )}
    //   </div>
    // </div>

    <div className="flex justify-center gap-12 items-center min-h-screen bg-gradient-to-t from-green-100 via-green-50 to-white text-gray-800 px-10 mt-[120px]">

      {/* Left illustration / info section */}
      <div className="h-[450px] w-[340px] bg-white shadow-md border border-green-100 rounded-2xl p-6 flex flex-col justify-center items-start self-start">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
          alt="Illustration"
          className="w-40 mx-auto mb-6"
        />
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          On registering, you can
        </h2>
        <ul className="space-y-3 text-gray-600 text-[15px]">
          <li className="flex items-center gap-2">
          <FiCheckCircle className="text-green-700" size={18} />
            Build your profile and let recruiters find you
          </li>
          <li className="flex items-center gap-2">
            <FiCheckCircle className="text-green-700" size={18} />

            Get job postings delivered right to your email
          </li>
          <li className="flex items-center gap-2">
            <FiCheckCircle className="text-green-700" size={18} />

            Find a job and grow your career
          </li>
        </ul>
      </div>

      {
        !signedUpUser ? 
          <div className="w-[700px] bg-white rounded-2xl shadow-md border border-green-100 p-10">
            <h2 className="text-3xl font-semibold text-green-800 mb-1">
              Create your profile with <span className="font-serif">JobSpot</span>
            </h2>
            <p className="text-gray-600 mb-8">
              Search & apply for jobs from India’s best job platform
            </p>

            {/* Form inputs */}
            <div className="flex flex-col">
              <label className="mt-2 font-medium text-gray-700">
                Full Name<span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="outline-none p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-800 focus:border-green-800"
              />

              <label className="mt-4 font-medium text-gray-700">
                Email ID<span className="text-red-700">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="outline-none p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-800 focus:border-green-800"
              />

              <label className="mt-4 font-medium text-gray-700">
                Password<span className="text-red-700">*</span>
              </label>
              <input
                type="password"
                placeholder="Enter a secure password"
                className="outline-none p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-800 focus:border-green-800"
                onChange={(e) => {
                  setPasswordErr(
                    e.target.value.length < 6 ? "Password must be at least 6 characters" : ""
                  );
                }}
              />
              {passwordErr && (
                <div className="text-red-700 text-sm mt-1">{passwordErr}</div>
              )}
            </div>

            {/* Work status section */}
            <div className="mt-6">
              <p className="font-medium text-gray-700 mb-3">
                Work Status<span className="text-red-700">*</span>
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div
                  onClick={() => setSelectedStatus("experienced")}
                  className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                    selectedStatus === "experienced"
                      ? "border-green-800 bg-green-50 shadow-sm"
                      : "border-gray-300 hover:border-green-800"
                  }`}
                >
                  <p className="font-medium text-gray-800">I’m Experienced</p>
                  <p className="text-sm text-gray-500">
                    I have work experience (excluding internships)
                  </p>
                </div>

                <div
                  onClick={() => setSelectedStatus("fresher")}
                  className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                    selectedStatus === "fresher"
                      ? "border-green-800 bg-green-50 shadow-sm"
                      : "border-gray-300 hover:border-green-800"
                  }`}
                >
                  <p className="font-medium text-gray-800">I’m a Fresher</p>
                  <p className="text-sm text-gray-500">
                    I’m a student / Haven’t worked after graduation
                  </p>
                </div>
              </div>
            </div>

            {/* Checkbox */}
            <label className="mt-6 flex  items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" className="mt-[2px]" />
              <span className="text-sm text-gray-600">
                Send me important updates & promotions via SMS, email, and WhatsApp
              </span>
            </label>


            {/* Terms & Register */}
            <p className="text-sm text-gray-500 mt-4">
              By clicking <span className="font-semibold text-green-800">Register</span>, you agree to the{" "}
              <span className="text-green-800 underline cursor-pointer">
                Terms and Conditions
              </span>{" "}
              &{" "}
              <span className="text-green-800 underline cursor-pointer">
                Privacy Policy
              </span>{" "}
              of JobSpot.com
            </p>

            <button className="mt-6 w-full bg-green-800 hover:bg-green-900 text-white py-3 rounded-md font-medium transition-all duration-300 shadow-md">
              Register
            </button>

            <div className="flex justify-center mt-4">or</div>

            <button
            onClick={()=> handleSignup()}
             className="mt-4 w-full bg-green-800 hover:bg-green-900 text-white py-3 rounded-md font-medium transition-all duration-300 shadow-md">
              signup with google
            </button>
          </div>
        :

       <Navigate to='/user/completeProfile'/>


      }

      
    </div>
  );
};

export default Register;
