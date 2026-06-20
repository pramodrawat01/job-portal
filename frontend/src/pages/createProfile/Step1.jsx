import React, { useState } from "react";
import { FiMail , FiCheckCircle } from "react-icons/fi";
import { LuArrowLeft } from "react-icons/lu"
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../../store/signupSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const RegisterPhone = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("")

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const {name, id} =useSelector(state => state.signup?.user)
  // console.log(name, id,  "this is user ")

  // console.log(localStorage.getItem("user"))

  // generate otp and sent it to entered mobile number 
  const handleSendOtp = async(e) => {
    e.preventDefault()
    if(!email.trim()){
      toast.error("Please enter email first")
      return;
    }

    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/v1/send-otp`, {
          method : "POST",
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            email
          })
        })

        const data = await res.json();
        if(res.ok){
          setOtpSent(true)
        }
    } catch (error) {
      toast.error("Something is wrong, Can not sent otp!")
      console.log(error);
    }
  };

  // verify otp 
  const handleVerifyOtp = async(e) =>{
    e.preventDefault()
    console.log("email : ", email , "otp : ", otp)  
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/v1/verify-otp`, {
        method : "POST",
        headers : {
          "Content-Type": "application/json",
        },
        credentials : 'include',
        body : JSON.stringify({otp, email})
      })
      const data = await res.json()


      if(res.status === 200){
        console.log(data, "otp verification data")
        toast.success(data.message)
        setIsVerified(true)
        dispatch(verifyOtp())
      }
      if(!res.ok){
        console.log("failed to vefify otp : ", data.message)
      }
    } catch (error) {
      toast.error("otp verification failed ! try again")
      console.log('otp verification failed ! try again')
    }
  }



  

  return (
      <div className="w-full p-8 flex flex-col justify-center items-start self-start">
        {
          otpSent && (
            <LuArrowLeft
            onClick={() => setOtpSent(false)}
            size={24} color="#000" />
          )
        }
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Verify your Email Address
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Enter your email to receive an OTP for verification.
        </p>

        <form  className="w-full space-y-5">
          {/* email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
             Email <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500">
              <FiMail  className="ml-3 text-gray-500" size={18} />
              <input
                type="email"
                value={email}
                placeholder="Enter email address"
                className="w-full p-2 rounded-r-lg outline-none"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Verify Button */}
          {!otpSent && (
            <button
              type="button"
              onClick={handleSendOtp}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition duration-200"
            >
              Send OTP
            </button>
          )}

          {/* OTP Input */}
          {otpSent && !isVerified && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  maxLength={6}
                  required
                />
              </div>
              <button
                type="submit"
                onClick={handleVerifyOtp}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition duration-200"
              >
                Verify OTP
              </button>
            </div>
          )}

          {/* Verified Message */}
          {/* Verified Message */}
{isVerified && (
  <div className="flex flex-col items-center gap-4 mt-4 w-full">
    <div className="flex items-center gap-2 text-green-700 font-semibold text-lg">
      <FiCheckCircle size={22} />
      <span>Email verified successfully!</span>
    </div>
    <p className="text-sm text-gray-500">You can now proceed to complete your profile.</p>
    <button
      onClick={() => navigate('/user/completeProfile')}
      className="w-full bg-green-800 hover:bg-green-900 text-white font-medium py-3 rounded-lg transition duration-200"
    >
      Next →
    </button>
  </div>
)}
        </form>
      </div>
  );
};

export default RegisterPhone;
