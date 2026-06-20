import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/loginSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaBriefcase,
} from "react-icons/fa";


const Login = () => {

  const [userLogin, setUserLogin] = useState({
    email : "",
    password : ""
  })
    const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();

    if(!userLogin.email || !userLogin.password ){
      return alert("add details first !")
    } 

    // console.log(userLogin)
    console.log(import.meta.env.VITE_BASE_URL)
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/v1/login`, {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        credentials : "include",
        body : JSON.stringify(userLogin)
      })

      const data = await res.json()

      if(res.ok){
       localStorage.setItem("user", JSON.stringify(data.user));
        dispatch(addUser(data.user))
        toast.success("Login Successful!")
        navigate('/user/completeProfile')
      }
    } catch (error) {
      console.log(error.message, "error in login")
      toast.error("Login failed...!")
    }

    // if (email && password) {
    //   dispatch(addUser({ email }));
    //   console.log("User logged in:", email);
    // } else {
    //   alert("Please fill both fields");
    // }
  };

   return (
    <div className="min-h-screen flex items-center justify-center px-6 ">
      <div className="w-full max-w-6xl min-h-[700px] bg-white rounded-[40px] overflow-hidden shadow-2xl flex">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-green-700 via-green-600 to-green-500 relative items-center justify-center">
          {/* Circles */}
          <div className="absolute w-[320px] h-[320px] border border-green-300/40 rounded-full"></div>

          <div className="absolute w-[230px] h-[230px] border border-green-300/40 rounded-full"></div>

          <div className="absolute w-[140px] h-[140px] border border-green-300/40 rounded-full"></div>

          {/* Floating Users */}
          <img
            src="https://i.pravatar.cc/100?img=1"
            alt=""
            className="absolute top-36 left-28 w-14 h-14 rounded-full border-4 border-white shadow-lg"
          />

          <img
            src="https://i.pravatar.cc/100?img=2"
            alt=""
            className="absolute top-24 right-32 w-16 h-16 rounded-full border-4 border-white shadow-lg"
          />

          <img
            src="https://i.pravatar.cc/100?img=3"
            alt=""
            className="absolute bottom-36 left-24 w-16 h-16 rounded-full border-4 border-white shadow-lg"
          />

          <img
            src="https://i.pravatar.cc/100?img=4"
            alt=""
            className="absolute bottom-28 right-28 w-14 h-14 rounded-full border-4 border-white shadow-lg"
          />

          {/* Center User */}
          <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-2xl z-10">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt=""
              className="w-28 h-28 rounded-full"
            />
          </div>

          {/* Logo */}
          <div className="absolute top-4 right-1 flex items-center gap-2 ">
            
            <span className="text-6xl font-bold text-white">
              Welcome to 
            </span>
          </div>

          {/* Bottom Text */}
          <div className="absolute bottom-16 px-10 text-center text-white">
            <h2 className="text-4xl font-bold leading-tight">
              Top companies are looking
              <br />
              for talents like you!
            </h2>

            <p className="mt-4 text-green-100 text-sm max-w-md">
              Get hired by leading companies, discover opportunities,
              and track your applications in one place.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 relative ">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
              <FaBriefcase className="text-green-700" />
              <span className="text-xl font-bold text-green-700">
                JOBSPOT
              </span>
            </div>

            <h2 className="text-6xl font-bold text-gray-800 absolute top-4 left-1 flex items-center gap-2">
              100xPortal
            </h2>

            <p className="text-gray-500 mt-2">
              Login to continue your career journey.
            </p>

            <form
              onSubmit={handleLogin}
              className="mt-8 space-y-5"
            >
              <input
                type="email"
                placeholder="Email Address"
                value={userLogin.email}
                onChange={(e) =>
                  setUserLogin((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={userLogin.password}
                  onChange={(e) =>
                    setUserLogin((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-green-600"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>

              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" />
                  Remember Me
                </label>

                <button
                  type="button"
                  className="text-green-700 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition"
              >
                Login
              </button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-[1px] bg-gray-200"></div>
              <span className="text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-[1px] bg-gray-200"></div>
            </div>

            <button className="w-full border border-gray-200 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition">
              <FaGoogle />
              Continue with Google
            </button>

            <p className="text-center text-gray-500 mt-6">
              Don't have an account?{" "}
              <span className="text-green-700 font-semibold cursor-pointer hover:underline">
                Register Here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
