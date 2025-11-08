// import React from 'react'
// import { MdCancel } from "react-icons/md";
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { removeUser } from '../store/loginSlice';

// const ProfileCompo = ({setIsProfileOpen}) => {

//   const {isLoggedIn} = useSelector(state => state.login)

//   const dispatch = useDispatch()

//   const user = JSON.parse(localStorage.getItem('user'))

//   const haldleLogout = async()=>{
//     dispatch(removeUser())

//      localStorage.removeItem('user')
//   }
//   return (
//     <div className='rounded-lg w-[30vw] h-[100vh] absolute top-0 right-0  bg-[#252525]'>

//       <MdCancel  onClick={()=> setIsProfileOpen(false)}/>


//       {
//         !user ? 

//         <div>login</div>

//         :
        
//         <div>
//           <Link to='/appliedHistory' 
//           onClick={()=> setIsProfileOpen(false)} >application History</Link>
//           <Link to='/savedJobs'
//           onClick={()=> setIsProfileOpen(false)} 
//           >saved jobs</Link>

          
//           <button 
//           className='border-1 px-6 py-1 rounded-sm'
//           onClick={() => {haldleLogout() 
//           setIsProfileOpen(false)}}>logout bro</button>
//         </div>

//       }

//       </div>
      
//   )
// }

// export default ProfileCompo


import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeUser } from "../store/loginSlice";
import Overlay from "./Overlay"; // 👈 import overlay

const ProfileCompo = ({ setIsProfileOpen }) => {
  const { isLoggedIn } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const [closing, setClosing] = useState(false);

  const handleLogout = async () => {
    dispatch(removeUser());
    localStorage.removeItem("user");
  };

  // Smooth close
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => setIsProfileOpen(false), 300); // matches animation duration
  };

  return (
    <>
      {/* ✅ Overlay appears behind the panel */}
      <Overlay handleClose={handleClose} closing={closing} />

      <div
        className={`fixed top-0 right-0 h-full bg-[#1f1f1f] text-white shadow-2xl p-6 flex flex-col justify-between z-50 rounded-l-2xl
        w-[23vw] max-md:w-[80vw] transition-all
        ${closing ? "animate-slideOut" : "animate-slideIn"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold tracking-wide">My Profile</h2>
          <MdCancel
            onClick={handleClose}
            className="text-2xl text-gray-400 hover:text-white cursor-pointer transition-all duration-200"
          />
        </div>

        {/* Body */}
        {!user ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-300">
            <p className="mb-4 text-lg">You’re not logged in yet.</p>
            <Link
              to="/login"
              onClick={handleClose}
              className="bg-[#2ecc71] hover:bg-[#27ae60] px-5 py-2 rounded-md font-semibold transition-all"
            >
              Login
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm text-gray-400 mb-1">Logged in as</p>
              <h3 className="text-lg font-medium">
                {user.name || "Guest User"}
              </h3>
            </div>

            <div className="flex flex-col gap-3 text-base font-medium">
              <Link
                to="/appliedHistory"
                onClick={handleClose}
                className="hover:text-[#2ecc71] transition-all"
              >
                📄 Application History
              </Link>

              <Link
                to="/savedJobs"
                onClick={handleClose}
                className="hover:text-[#2ecc71] transition-all"
              >
                💾 Saved Jobs
              </Link>
            </div>

            <button
              className="mt-6 bg-[#e74c3c] hover:bg-[#c0392b] px-6 py-2 rounded-md font-semibold transition-all self-start"
              onClick={() => {
                handleLogout();
                handleClose();
              }}
            >
              Logout
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="text-xs text-gray-500 mt-8 border-t border-gray-600 pt-4">
          © 2025 JobBoard Inc. | All rights reserved.
        </div>
      </div>
    </>
  );
};

export default ProfileCompo;
