import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { IoHome } from "react-icons/io5";
import { PiBagFill } from "react-icons/pi";
import { BsBuildings } from "react-icons/bs";
import { IoBookSharp } from "react-icons/io5";


const ProfileSection = () => {


  const [active, setActive] = useState("Home");

  const scrollToSection = (id, name) => {
    setActive(name);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };


  const {profile} = useSelector(state => state.signup)
  console.log(profile, "this is user profile")

  function calculateProfileCompletion(){
    let totalFields = 8;
    let completed = 0;
    if (profile.name && profile.email && profile.phone) completed++;
    if (profile.education.length > 0) completed++;
    if (profile.experience.length > 0) completed++;
    if (profile.skills.length > 0) completed++;
    if (profile.resume) completed++;
    if (profile.profilePic) completed++;
    if (Object.keys(profile.socialLinks).length > 0) completed++;

    return Math.round((completed/ totalFields) * 100);


  }

  const completion = calculateProfileCompletion();


  return (
    <div className="w-[320px] rounded-xl border bg-white border-[#d6d6d6] h-[600px] sticky top-[80px] self-start">

      <div className="bg-white rounded-xl  p-4 flex flex-col items-center">
        
        {/* Profile Image with Circular Progress */}
        <div className="relative w-28 h-28 mb-3">
          <svg
            className="absolute top-0 left-0 w-full h-full -rotate-90"
            viewBox="0 0 100 100"
          >
            {/* Background ring */}
            <circle
              cx="50"
              cy="50"
              r="38"
              stroke="#e5e7eb"
              strokeWidth="2"
              fill="none"
            />
            {/* Progress ring */}
            <circle
              cx="50"
              cy="50"
              r="39"
              stroke="#117a5b"
              strokeWidth="5"
              fill="none"
              strokeDasharray="283"
              strokeDashoffset={`${283 - (283 * completion) / 100}`}
              strokeLinecap="round"
              className="transition-all duration-700 ease-in-out"
            />
          </svg>

          <img
            src={
              profile.profilePic ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="profile"
            className="w-20 h-20 rounded-full border-4 border-white  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />

          {/* Percentage inside circle */}
          <p className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 font-bold text-[#117a5b]">
            {completion}%
          </p>
        </div>


        {/* Profile Info */}
        <h2 className="font-semibold text-[#000] mt-4">
          {profile.name || "Your Name"}
        </h2>
        
        <p className=" text-[#1e1e1e] mb-1">
          {profile.jobProfile.slice(0,1)}
        </p>

        <p className="text-sm text-gray-500 mb-1">
          {profile.email || "Email not added"}
        </p>

        <button className="text-sm text-white bg-[#117a5b] px-4 py-2 rounded-4xl font-medium hover:underline my-4">
          Complete Profile
        </button>

        

        {/* Optional Text */}
        {completion < 100 ? (
          <p className="text-sm text-gray-500 text-center px-4">
            Complete your profile to improve job matching accuracy.
          </p>
        ) : (
          <p className="text-sm text-green-600 text-center px-4">
            Profile is 100% complete 🎉
          </p>
        )}

        {/* <div className='flex flex-col justify-center items-center gap-5 w-[180px] mt-6 '>
          <div className='flex items-center w-full justify-between px-5 py-2 bg-[#e4e4e4] rounded-3xl ' >
            <IoHome className='text-xl '  strokeWidth={1} />
            <p>My Home</p>
          </div>
          <div className='flex items-center w-full justify-between px-5 py-2 border-1 border-[#cac6c6] rounded-3xl'>
            <PiBagFill className='text-xl '  strokeWidth={1} />
            <p>Jobs</p>
          </div>
          <div className='flex items-center w-full justify-between px-5 py-2 border-1 border-[#cac6c6] rounded-3xl'>
            <BsBuildings className='text-xl '  strokeWidth={1} />
            <p>Companies</p>
          </div>
          <div className='flex items-center w-full justify-between px-5 py-2 border-1 border-[#cac6c6] rounded-3xl'>
            <IoBookSharp className='text-xl '  strokeWidth={1}/>
            <p>Blogs</p>
          </div>
        </div> */}

        <div className="flex flex-col justify-center items-center gap-5 w-[180px] mt-6">
          
          <div
            onClick={() => scrollToSection('home-section', "Home")}
            className={`flex items-center w-full justify-between px-5 py-2 rounded-3xl cursor-pointer
            ${active === "Home" ? "bg-[#117a5b] text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            <IoHome className="text-xl" />
            <p>My Home</p>
          </div>

          <div
            onClick={() => scrollToSection('job-section', "Jobs")}
            className={`flex items-center w-full justify-between px-5 py-2 rounded-3xl cursor-pointer
            ${active === "Jobs" ? "bg-[#117a5b] text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            <PiBagFill className="text-xl" />
            <p>Jobs</p>
          </div>

          <div
            onClick={() => scrollToSection('companies-section', "Companies")}
            className={`flex items-center w-full justify-between px-5 py-2 rounded-3xl cursor-pointer
            ${active === "Companies" ? "bg-[#117a5b] text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            <BsBuildings className="text-xl" />
            <p>Companies</p>
          </div>

          {/* <div
            onClick={() => setActive("Blogs")}
            className={`flex items-center w-full justify-between px-5 py-2 rounded-3xl cursor-pointer
            ${active === "Blogs" ? "bg-green-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            <IoBookSharp className="text-xl" />
            <p>Blogs</p>
          </div> */}

        </div>
      
      </div>
    </div>

  )
}

export default ProfileSection