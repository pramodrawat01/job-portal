import React, { useState } from "react";
import { FiPhone, FiCheckCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../../store/signupSlice";

const RegisterPhone = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch()

  const {name, id} =useSelector(state => state.signup?.user)
  console.log(name, id,  "this is user ")

  // generate otp and sent it to entered mobile number 
  const handleVerify = async() => {

    setOtpSent(true);
  };

  // verify otp 
  const handleVerifyOtp = async() =>{
    // try {

    //   const res = await fetch('http://localhost:3000/v1/verify_otp', {
    //     method : "POST",
    //     headers : {
    //       "Content-Type": "application/json",
    //     },
    //     body : JSON.stringify({otp, id : id})
    //   })


    //   const data = await res.json()

    //   if(res.status = 200){
    //     alert(data.message)
    //     dispatch(verifyOtp())
    //   }
    // } catch (error) {
    //   console.log('otp verification failed ! try again')
    // }


    dispatch(verifyOtp())

    
  }

  // const handleOtpSubmit = (e) => {
  //   e.preventDefault();
  //   setIsVerified(true);
  // };

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

      {/* Right section - Mobile number verification */}
      <div className="w-[680px] bg-white shadow-md border border-green-100 rounded-2xl p-8 flex flex-col justify-center items-start self-start">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Verify your Mobile Number
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Enter your mobile number to receive an OTP for verification.
        </p>

        <form  className="w-full space-y-5">
          {/* Mobile Number Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500">
              <FiPhone className="ml-3 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Enter mobile number"
                className="w-full p-2 rounded-r-lg outline-none"
                maxLength={10}
                required
              />
            </div>
          </div>

          {/* Verify Button */}
          {!otpSent && (
            <button
              type="button"
              onClick={handleVerify}
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
                onClick={()=> handleVerifyOtp()}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition duration-200"
              >
                Verify OTP
              </button>
            </div>
          )}

          {/* Verified Message */}
          {isVerified && (
            <div className="flex items-center gap-2 mt-4 text-green-700 font-medium">
              <FiCheckCircle size={20} />
              <span>Number verified successfully!</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterPhone;
