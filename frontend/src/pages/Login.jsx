import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/loginSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(addUser({ email }));
      console.log("User logged in:", email);
    } else {
      alert("Please fill both fields");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-t from-green-100 via-green-50 to-white">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-[350px] text-center border border-green-100">
        <h2 className="text-3xl font-semibold text-green-800 mb-6">
          Login Page
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
          />

          <button
            type="submit"
            className="bg-green-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-all duration-200"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-green-700 font-medium cursor-pointer hover:underline"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
