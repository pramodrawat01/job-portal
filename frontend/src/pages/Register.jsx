
import React, { useEffect, useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../store/loginSlice";
import Step1 from "./createProfile/Step1";
import { Link, Navigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { updatePersonalInfo } from "../store/signupSlice";


const Register = () => {
  const [signedUpUser, setSignedUpUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [formData, setFormData] = useState(
    { name: "", 
      email: "", 
      password: "",
      workStatus : "",
      sendUpdates : false
    }
  );

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

  const handleManualRegister = async(e) => {
     e.preventDefault();
     localStorage.removeItem('step1Completed')
     console.log(selectedStatus, "this is selected status")
     if(selectedStatus) {
       formData.workStatus = selectedStatus
     }

     if (!formData.name || !formData.email || !formData.password || !formData.workStatus){
       return alert("fill all req fields first")
     }

     try {
      const res = await fetch('http://localhost:3000/v1/register', {
        method : "POST",
        headers : {
          "Content-Type": "application/json",
        },
        credentials : "include",
        body : JSON.stringify(formData),
        
      })
      const data = await res.json()
      
      if(res.status === 400){
        return alert(data.message)
      }

      if(res.status === 201 ){
        setSignedUpUser(data.user);
        console.log(data.user, "user logged in")
        // localStorage.setItem('user', JSON.stringify(data.user))
        dispatch(updatePersonalInfo(data.user))
        // localStorage.setItem('step1Completed', JSON.stringify(true))

      }
      
     } catch (error) {
      
     }

    //  console.log(formData, "registerd this user")
    //  alert("user has to register")



    // if (formData.name && formData.email && formData.password) {
    //   // localStorage.setItem("user", JSON.stringify(formData));
    //   // dispatch(addUser(formData));
    //   // setSignedUpUser(formData);
    //   console.log("Registered manually:", formData);
    // } else {
    //   alert("Please fill all fields");
    // }
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
                value={formData.name}
                onChange={(e)=> {setFormData( prev =>({...prev, name : e.target.value }))}}
                type="text"
                placeholder="Enter your full name"
                className="outline-none p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-800 focus:border-green-800"
              />

              <label className="mt-4 font-medium text-gray-700">
                Email ID<span className="text-red-700">*</span>
              </label>
              <input
              value={formData.email}
              onChange={(e)=> {setFormData(prev => ({...prev, email : e.target.value}))}}
                type="email"
                placeholder="Enter your email"
                className="outline-none p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-800 focus:border-green-800"
              />

              <label className="mt-4 font-medium text-gray-700">
                Password<span className="text-red-700">*</span>
              </label>
              <input
                value={formData.password}
                type="password"
                placeholder="Enter a secure password"
                className="outline-none p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-800 focus:border-green-800"
                onChange={(e) => {
                  setPasswordErr(
                    e.target.value.length < 6 ? "Password must be at least 6 characters" : ""
                  );
                  setFormData( prev => ({...prev, password : e.target.value}))
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
                  onClick={() => 
                   setSelectedStatus("experienced")}
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
            <label 
            onClick={()=> setFormData(prev => ({...prev,  sendUpdates : true }))}
            className="mt-6 flex  items-center gap-2 cursor-pointer select-none">
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

            <button
            onClick={(e) => handleManualRegister(e)}
             className="mt-6 w-full bg-green-800 hover:bg-green-900 text-white py-3 rounded-md font-medium transition-all duration-300 shadow-md">
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

       <Navigate to='/user/completeProfile' />


      }

      
    </div>
  );
};

export default Register;
