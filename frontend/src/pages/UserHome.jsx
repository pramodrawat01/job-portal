

import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchJobs } from '../store/jobsSlice'
import { Link } from 'react-router-dom'
import ProfileSection from '../components/ProfileSection'
import Advertise from '../components/Advertise'
import banner1 from '../assets/banner1.png'
import resume_temp from '../assets/resume-template.png'
import highlight_application from '../assets/banner2.png'
import TopCompanies from '../components/TopCompanies'
import RecommendedJobs from '../components/RecommendedJobs'
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import UserHomeShimmer from '../shimmer/UserHomeShimmer'

const UserHome = () => {


  
  const dispatch = useDispatch()
  const {jobs, loading, error, categories} = useSelector(state => state.jobs)
	

  

  useEffect(() => {
  // Fetch jobs once
    dispatchJobType('all');
  }, []); // run once on mount


  function dispatchJobType(job_type){
    dispatch(fetchJobs(job_type))
  }



  // carousel for categories
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({
      left: -carouselRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({
      left: carouselRef.current.offsetWidth,
      behavior: "smooth",
    });
  };





  if(loading) return <UserHomeShimmer/>
  if(error) return <p>error :  {error}</p>

  return (
    <div className='relative z-10  w-[75vw] mx-auto mt-[80px] pt-10'>

    <div className='relative flex gap-4 z-10 '>

      <ProfileSection/>
      <div className=' w-[800px]' id='home-section'>

        {/* banner section */}
        <div className='border-1 bg-gradient-to-b from-white to-[#EEFDF2] border-[#b3cac3] h-[160px] w-full shadow-md shadow-black/30 rounded-2xl flex items-center'>

          <img src={banner1} className='h-full flex '/>
          <div className='w-[240px]'>
            <div className='text-xl'>Become a pro!</div>
            <div className='text-sm text-[#3b3b3b]'>Get enhanced profile, hidden jobs, AI resume maker, AI interview tools, & more</div>
          </div>

          <button className='rounded-2xl px-4 py-2 bg-[#117a5b] text-white'>Upgrade now</button>
        </div>


      {/* recomended jobs for user section */}
      <RecommendedJobs/>

      {/* category section */}

        <div id='job-section' className="relative bg-white shadow-md shadow-black/20 rounded-2xl p-4 mt-6">
          <h2 className="text-xl font-semibold mb-3">Explore Categories</h2>

          {/* Left & Right Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white border border-gray-300 p-2 rounded-full shadow-sm hover:bg-gray-50 z-20"
          >
            <FiChevronLeft />
          </button>
          <button
            onClick={scrollRight}
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white border border-gray-300 p-2 rounded-full shadow-sm hover:bg-gray-50 z-20"
          >
            <FiChevronRight />
          </button>

          {/* Carousel container */}
          <div
            ref={carouselRef}
            className="overflow-x-scroll scroll-smooth no-scrollbar"
          >
            {/* Grid inside scroll */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4 grid-rows-2 min-w-max px-6">
              {categories?.map((job) => (
                <Link
                  to={`/jobs/${encodeURIComponent(job.category)}`}
                  key={job.category}
                  className=" bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 h-[130px] w-[200px] flex flex-col justify-center items-center"
                >
                  <h3 className="font-semibold text-gray-800">{job.category}</h3>
                  <p className="text-gray-500 text-sm">{job.numOfJobs}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* resume template */}
        <div className='border-1 bg-gradient-to-b from-white to-[#FFEEF3] border-[#b3cac3] h-[160px] w-full shadow-md shadow-black/30 rounded-2xl flex items-center mt-6 justify-around'>

          <img src={resume_temp} className='h-[85%] flex self-end '/>
          <div className='w-[260px] '>
            <div className='text-xl'>create resume in 3 easy steps</div>
            <div className='text-sm mt-3 text-[#3b3b3b]'>1. Add the missing details in your profile</div>
             <div className='text-sm text-[#3b3b3b]'>2. Choose a template for your resume</div>
              <div className='text-sm text-[#3b3b3b]'>3. Improve the content with AI </div>
          </div>

          <button className='rounded-2xl px-4 py-2 bg-[#117a5b] text-white'>Upgrade now</button>
        </div>


        {/* top companies */}
        <TopCompanies/>

         {/*  highlight application banner */}
        <div className='border-1 bg-gradient-to-b from-white to-[#E9F6FF] border-[#b3cac3] h-[160px] w-full shadow-md shadow-black/30 rounded-2xl flex items-center mt-6 justify-around'>

          
          <div className=''>
            <div className='w-[300px] flex flex-col gap-8 '>
              <div className='text-lg'>Highlight your application and stand out from rest of the applicants</div>
              
              <button className='rounded-2xl px-4 py-2 bg-[#117a5b] text-white w-[150px]'>Upgrade now</button>
            </div>
          </div>

          <img src={highlight_application} className='h-[85%] flex self-end '/>
        </div>

      </div>

      {/* <Advertise/> */}

    </div>

    
    </div>
  )
}

export default UserHome

