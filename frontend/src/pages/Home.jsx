import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiBriefcase, FiUsers } from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";
import { MdWorkOutline } from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { FaQuestionCircle } from "react-icons/fa";




import { FaUserPlus, FaCloudUploadAlt, FaSearch, FaCheckCircle } from "react-icons/fa";
const steps = [
  {
    id: 1,
    icon: <FaUserPlus className="text-green-800 text-2xl" />,
    title: "Create account",
    description:
      "Aliquam facilisis egestas sapien, nec tempor leo tristique at.",
  },
  {
    id: 2,
    icon: <FaCloudUploadAlt className="text-white text-2xl" />,
    title: "Upload CV/Resume",
    description:
      "Curabitur sit amet maximus ligula. Nam a nulla ante. Nam sodales.",
    isHighlighted: true,
  },
  {
    id: 3,
    icon: <FaSearch className="text-green-800 text-2xl" />,
    title: "Find suitable job",
    description:
      "Phasellus quis eleifend ex. Morbi nec fringilla nibh.",
  },
  {
    id: 4,
    icon: <FaCheckCircle className="text-green-800 text-2xl" />,
    title: "Apply job",
    description:
      "Curabitur sit amet maximus ligula. Nam a nulla ante. Nam sodales purus.",
  },
];

import { FiCode, FiMusic, FiHeart, FiDatabase } from "react-icons/fi";
import {
  FaPencilRuler,
  FaBullhorn,
  FaVideo,
  FaMoneyBillWave,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchJobs } from "../store/jobsSlice";
import { iconMap } from "../utils/iconMap";

const jobs = [
  {
    id: 1,
    title: "Senior UX Designer",
    type: "Contract Base",
    location: "Australia",
    salary: "$30K-$35K",
    remaining: "4 Days Remaining",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Upwork-logo.svg",
    bg: "bg-green-100",
    btnColor: "bg-green-500",
  },
  {
    id: 2,
    title: "Software Engineer",
    type: "Full Time",
    location: "China",
    salary: "$50K-$60K",
    remaining: "4 Days Remaining",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    bg: "bg-white",
    btnColor: "bg-green-500",
  },
  {
    id: 3,
    title: "Junior Graphic Designer",
    type: "Full Time",
    location: "Canada",
    salary: "$50K-$70K",
    remaining: "4 Days Remaining",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
    bg: "bg-white",
    btnColor: "bg-green-500",
  },
  {
    id: 4,
    title: "Product Designer",
    type: "Full Time",
    location: "United States",
    salary: "$35K-$40K",
    remaining: "4 Days Remaining",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Udemy_logo.svg",
    bg: "bg-white",
    btnColor: "bg-green-500",
  },
];

const categoriess = [
  {
    id: 1,
    icon: <FaPencilRuler className="text-green-800 text-3xl" />,
    title: "Graphics & Design",
    positions: "357 Open position",
  },
  {
    id: 2,
    icon: <FiCode className="text-green-800 text-3xl" />,
    title: "Code & Programming",
    positions: "312 Open position",
  },
  {
    id: 3,
    icon: <FaBullhorn className="text-green-800 text-3xl" />,
    title: "Digital Marketing",
    positions: "297 Open position",
  },
  {
    id: 4,
    icon: <FaVideo className="text-green-800 text-3xl" />,
    title: "Video & Animation",
    positions: "247 Open position",
  },
  {
    id: 5,
    icon: <FiMusic className="text-green-800 text-3xl" />,
    title: "Music & Audio",
    positions: "204 Open position",
  },
  {
    id: 6,
    icon: <FaMoneyBillWave className="text-green-800 text-3xl" />,
    title: "Account & Finance",
    positions: "167 Open position",
  },
  {
    id: 7,
    icon: <FiHeart className="text-green-800 text-3xl" />,
    title: "Health & Care",
    positions: "125 Open position",
  },
  {
    id: 8,
    icon: <FiDatabase className="text-green-800 text-3xl" />,
    title: "Data & Science",
    positions: "57 Open position",
  },
];

const Home = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchJobs('all'))
  },[])

  const [active, setActive] = useState("Home");
  
    const scrollToSection = (id, name) => {
      setActive(name);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };
  

  const {categories, featuredJobs} = useSelector(state => state.jobs)
  console.log(featuredJobs, "featured jobs in home")

  // console.log(categories, "this is categories")

  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  // console.log(isLoggedIn, "is user logged in ?");


  return (
    <div className="">
    
      
    
     

        {/* hero section */}
      <div className="hero-section z-10 bg-gradient-to-b from-white to-green-50 mt-[80px] w-full flex flex-col items-center px-6 md:px-0 relative">


    

<div className="absolute top-[380px] left-[950px] text-[#283a26] text-7xl font-extrabold select-none  animate-float">
  {"{:}"}
</div>

      
       {/* Background Gradient Blob */}
<div className="absolute  top-[-150px] left-[-180px] w-[400px] h-[400px] bg-gradient-to-bl from-green-500 via-green-300 to-transparent rounded-full blur-3xl opacity-40 pointer-events-none"></div>

<div className="absolute inset-0  -z-10 top-[180px] left-[480px] w-[500px] h-[500px] bg-gradient-to-bl from-green-500 via-green-300 to-transparent rounded-full blur-3xl opacity-40 pointer-events-none"></div>

<div className="absolute inset-0  -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:80px_80px]"></div>

      {/* Intro Text */}
      <div className="text-xl text-gray-600 mt-[80px]">
        Looking for your perfect role?
      </div>

      {/* Main Heading */}
      <div className="text-[55px] md:text-[70px] font-bold text-green-800 flex flex-col items-center leading-tight mt-2 text-center">
        <div>Get Your</div>
        <div className="text-green-800"><span className="text-orange-500">Dream Job</span> Here!</div>
      </div>

      {/* Subtext */}
      <p className="text-gray-500 mt-4 max-w-2xl text-center leading-relaxed">
        Our platform connects you with the best job opportunities tailored to
        your skills and preferences. Start your journey towards your dream
        career today!
      </p>

      {/* Buttons */}
      <div className="mt-8 flex gap-4">
        
        <Link to='/jobs' className="px-6 py-3 rounded-md bg-green-800 text-white font-medium hover:bg-green-600 transition">
          Explore Jobs Here 
        </Link>
        <button
        onClick={()=> {
          scrollToSection('footer-section', "Footer")
        }}
         className=" px-6 py-3 rounded-md border border-green-500 text-green-800 font-medium hover:bg-green-50 transition cursor-pointer">
          Learn More
        </button>
      </div>

      {/* Search Bar */}
      <div className="mt-12 bg-white border border-gray-100 shadow-md px-8 py-4 flex flex-col md:flex-row gap-4 items-center rounded-xl w-full max-w-3xl md:w-[80%]">
        <div className="flex flex-col md:flex-row gap-3 md:items-center w-full md:w-1/2">
          <IoSearchOutline className="text-2xl" />
          <input
            className="outline-none w-full border-b md:border-0 md:w-auto border-gray-200 focus:border-green-400 px-2 py-1"
            placeholder="Search for a job..."
          />
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:items-center w-full md:w-1/2">
         <IoLocationOutline className="text-2xl" />

          <input
            className="outline-none w-full border-b md:border-0 md:w-auto border-gray-200 focus:border-green-400 px-2 py-1"
            placeholder="Enter location"
          />
        </div>

        <button className="bg-green-800 text-white px-6 py-2 rounded-md hover:bg-green-600 transition w-full ">
          Find Job
        </button>
    </div>

      {/* Suggestions */}
      <div className="mt-6 text-gray-500 text-sm">
        <span className="font-semibold text-gray-600">Suggestions:</span>{" "}
        Designer, Programming, Digital Marketing, Video, Animation
      </div>

      {/* Stats Section */}
      <div className="flex justify-around mt-24 flex-wrap gap-6 w-full md:w-[80%]">
        
        {/* Live Jobs */}
        <div className="flex items-center gap-4 bg-white shadow-md rounded-xl px-8 py-5 border border-gray-100 hover:shadow-lg transition">
          <div className="bg-green-100 p-3 rounded-lg">
            <FiBriefcase className="text-green-800 text-3xl" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-800">1,75,324</p>
            <p className="text-gray-500 text-sm">Live Jobs</p>
          </div>
        </div>

        {/* Companies */}
        <div className="flex items-center gap-4 bg-white shadow-md rounded-xl px-8 py-5 border border-gray-100 hover:shadow-lg transition">
          <div className="bg-green-100 p-3 rounded-lg">
            <FaBuilding className="text-green-800 text-3xl" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-800">97,354</p>
            <p className="text-gray-500 text-sm">Companies</p>
          </div>
        </div>

        {/* Candidates */}
        <div className="flex items-center gap-4 bg-white shadow-md rounded-xl px-8 py-5 border border-gray-100 hover:shadow-lg transition">
          <div className="bg-green-100 p-3 rounded-lg">
            <FiUsers className="text-green-800 text-3xl" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-800">38,47,154</p>
            <p className="text-gray-500 text-sm">Candidates</p>
          </div>
        </div>

        {/* New Jobs */}
        <div className="flex items-center gap-4 bg-white shadow-md rounded-xl px-8 py-5 border border-gray-100 hover:shadow-lg transition">
          <div className="bg-green-100 p-3 rounded-lg">
            <MdWorkOutline className="text-green-800 text-3xl" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-800">7,532</p>
            <p className="text-gray-500 text-sm">New Jobs</p>
          </div>
        </div>
      </div>
    </div>


      <div className="mt-24 text-center px-6 md:px-20">
        
        <h2 className="text-4xl font-semibold text-gray-800">
          New Way To <span className="text-green-800">Get A Job</span>
        </h2>

        {/* Subheading */}
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          Upon gaining entry to the JobBoard platform, your initial task
          involves inputting your initial team positions or roles.
        </p>

        {/* Cards */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {/* Card 1 */}
          <div className="w-[320px] bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 text-left border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">
              Future Of Job Hunting
            </h3>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              Say goodbye to the traditional job search process and step into
              the future of employment opportunities.
            </p>
            <div className="flex items-center gap-2 text-green-800 font-medium mt-4 cursor-pointer hover:gap-3 transition-all">
              <span>Learn More</span>
              <FiArrowRight />
            </div>
          </div>

          {/* Card 2 */}
          <div className="w-[320px] bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 text-left border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">
              Simplify Research
            </h3>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              Save time and effort by accessing a wide range of opportunities in
              various industries and career stages.
            </p>
            <div className="flex items-center gap-2 text-green-800 font-medium mt-4 cursor-pointer hover:gap-3 transition-all">
              <span>Learn More</span>
              <FiArrowRight />
            </div>
          </div>

          {/* Card 3 */}
          <div className="w-[320px] bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 text-left border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Be Unique</h3>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              Craft a detailed profile that effectively showcases your unique
              skills, past experiences, and achievements.
            </p>
            <div className="flex items-center gap-2 text-green-800 font-medium mt-4 cursor-pointer hover:gap-3 transition-all">
              <span>Learn More</span>
              <FiArrowRight />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 text-center px-6 md:px-20 relative">
        {/* Background star-like decoration */}
        <div className="absolute left-[15%] top-0 text-green-200 text-6xl select-none">
          ✦
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-semibold text-gray-800">
          Popular <span className="text-green-800">Job Categories</span>
          <br />
          For Our Candidate
        </h2>

        {/* Categories Grid */}
        {/* <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {categories?.map((cat) => (
            <div
              key={cat.id}
              className="w-[250px] bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="bg-green-100 w-12 h-12 flex items-center justify-center rounded-lg mb-4 mx-auto">
                {cat.icon}
              </div>
              <h3 className="text-base font-semibold text-gray-800">
                {cat.title}
              </h3>
              <p className="text-gray-500 text-sm mt-1">{cat.positions}</p>
            </div>
          ))}
        </div> */}
        {/* <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
  {categories?.map((cat, index) => (
    <div
      key={cat.id || index}
      className="w-[250px] bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      <div className="bg-green-100 w-12 h-12 flex items-center justify-center rounded-lg mb-4 mx-auto">
        
        {iconMap[cat.category] || (
          <FiCode className="text-green-800 text-3xl" />
        )}
      </div>
      <h3 className="text-base font-semibold text-gray-800">
        {cat.category}
      </h3>
      <p className="text-gray-500 text-sm mt-1">
        {cat.numOfJobs || `${Math.floor(Math.random() * 300)} Open positions`}
      </p>
    </div>
  ))}
</div> */}

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {categories?.map((cat, index) => {
            const key = cat.category?.toLowerCase().trim();
            const IconComponent = iconMap[key] || FaQuestionCircle; // fallback icon

            return (
              <Link 
              to={`/jobs/${encodeURIComponent(cat.category)}`}
                key={cat.id || index}
                className="w-[250px] bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="bg-green-100 w-12 h-12 flex items-center justify-center rounded-lg mb-4 mx-auto">
                  <IconComponent className="text-green-800 text-3xl" />
                </div>
                <h3 className="text-base font-semibold text-gray-800">
                  {cat.category}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {cat.numOfJobs} Open position{cat.numOfJobs > 1 ? "s" : ""}
                </p>
              </Link>
            );
          })}
        </div>



        {/* Button */}
        <div className="mt-12">
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition">
            View More Jobs
          </button>
        </div>
      </div>


        <div className="bg-gradient-to-b from-white to-green-50 py-20 mt-10">
            <div className="max-w-6xl mx-auto px-5 text-center">
                {/* Heading */}
                <h2 className="text-4xl font-bold text-gray-800 mb-3">
                How <span className="text-green-800">Job Pilot</span> Work
                </h2>

                {/* Steps */}
                <div className="relative flex flex-col md:flex-row justify-between items-center mt-16">
                

                {steps.map((step) => (
                    <div
                    key={step.id}
                    className="flex flex-col items-center text-center max-w-xs mx-auto mb-10 md:mb-0"
                    >
                    <div
                        className={`w-16 h-16 flex items-center justify-center rounded-full shadow-md ${
                        step.isHighlighted ? "bg-green-500" : "bg-green-100"
                        }`}
                    >
                        {step.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mt-4">
                        {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-2">
                        {step.description}
                    </p>
                    </div>
                ))}
                </div>
            </div>
        </div>

      <div className="bg-gradient-to-b from-white to-green-100 py-20">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Explore Featured Jobs
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            Upon gaining entry to the JobBoard platform, your initial task
            involves inputting your initial team positions or roles.
          </p>

          <div className="space-y-6">
            {featuredJobs?.map((job) => (
              <Link
                to={`/jobs/${encodeURIComponent(job.category)}/applyto/${encodeURIComponent(job.id)}`}
                key={job.id}
                className="flex items-center justify-between p-5 py-10 rounded-xl shadow-md bg-white hover:shadow-lg transition-all duration-200"
              >
                {/* Left section */}
                <div className="flex items-center gap-4">
                 

                  {/* Job info */}
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {job.title}
                    </h3>
                    <p className="text-green-800 text-sm font-medium">
                      {job.company_name}
                    </p>

                    {/* Job details */}
                    <div className="flex gap-4 text-gray-500 text-sm mt-1">
                      <span className="flex items-center gap-1">
                        <FaLocationDot /> {job.candidate_required_location}
                      </span>
                      {job.salary && (
                        <span className="flex items-center gap-1">
                          <FaDollarSign /> {job.salary}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <BsCalendarDate />{" "}
                        {new Date(job.publication_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Apply button */}
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition-all"
                >
                  Apply Now →
                </a>
              </Link>
            ))}
          </div>

         

        </div>
      </div>


    </div>
  );
};

export default Home;
