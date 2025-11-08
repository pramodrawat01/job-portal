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
import { Link } from "react-router-dom";

const Register = () => {
  const [signedUpUser, setSignedUpUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.login);

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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-t from-green-100 via-green-50 to-white text-gray-800">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-[380px] text-center border border-green-100">
        <h2 className="text-3xl font-semibold text-green-800 mb-6">
          Register in <span className="font-bold family-sarif">JobSpot</span>
        </h2>
        <p>already have an account ? <Link to='/login' className="text-green-800 font-semibold">login here</Link></p>

        {signedUpUser ? (
          <>
            <Step1/>

            {/* <p className="text-gray-600 mb-4">
              Welcome,{" "}
              <span className="font-medium text-green-800">
                {signedUpUser.displayName || signedUpUser.name || "User"}
              </span>
            </p>
            <button
              onClick={handleSignout}
              className="bg-green-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-all duration-200"
            >
              Sign Out
            </button> */}
          </>
        ) : (
          <>
            {/* Manual Register */}
            <form onSubmit={handleManualRegister} className="flex flex-col gap-4 mb-6">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
              />

              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
              />

              <button
                type="submit"
                className="bg-green-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-all duration-200"
              >
                Register
              </button>
            </form>

            <div className="flex items-center gap-2 mb-6">
              <div className="h-px bg-gray-300 w-full" />
              <span className="text-gray-500 text-sm">or</span>
              <div className="h-px bg-gray-300 w-full" />
            </div>

            {/* Google Signup */}
            <button
              onClick={handleSignup}
              className="flex items-center justify-center gap-2 bg-white border border-green-300 text-green-800 px-6 py-2 rounded-lg font-medium hover:bg-green-100 transition-all duration-200 w-full"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                alt="Google"
                className="w-5 h-5"
              />
              Sign up with Google
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
