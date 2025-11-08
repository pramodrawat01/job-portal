import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";

const RecommendedJobs = () => {

  const { jobs } = useSelector((state) => state.jobs);
  const [matched, setMatched] = useState([]);
  // console.log(jobs, "recommended jobs");

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

  // here i can fetch jobs based on user's profile and preference (key skills)
  // will use keyskills from user's profile later
  const keySkills = [
    "js",
    "react",
    "es6",
    "node",
    "api",
    "frontend",
    "java",
    "c++",
    "python",
  ];

  const JobsMatchedWithSkills = jobs?.filter((job) => {
    let matchCount = 0;
    job.tags.forEach((j) => {
      if (keySkills.includes(j)) {
        matchCount++;
      }
    });

    if (matchCount >= 2) {
      return true;
    }
  });

  // console.log(JobsMatchedWithSkills, "match or not?");

  return (
    <div className="h-[300px] mt-6 bg-[#fff] rounded-2xl shadow-2xl shadow-black/20 px-4 pt-4 relative">
      <div className="text-[20px] font-semibold">Recommended Jobs for you</div>
      {/* carousel container */}
      <div
        ref={carouselRef}
        className="no-scrollbar flex gap-2 overflow-x-scroll scroll-smooth  snap-x snap-mandatory no-scrollbar mt-8  h-[160px] "
      >
        {JobsMatchedWithSkills?.map((job) => {
          
          const publishedDate = new Date(job.publication_date)
          const now = new Date()
          const diffMs = now - publishedDate
          const diffDays = Math.floor(diffMs/(1000*60*60*24))
          return (

            <Link
              key={job.id} 
              to={`/jobs/${encodeURIComponent(job.category)}/applyto/${job.id}`}
              className="shadow-md shadow-black/30 h-[150px] w-[200px] rounded-2xl flex-shrink-0 flex flex-col px-2 pt-4"
            >
             
             <div className="flex justify-between text-sm">
              <p > {job.company_name.length > 15 ? job.company_name.slice(0,15) + "..." : job.company_name}</p>

              <p className="text-[#6e6e6e]">{diffDays}d ago</p>
             </div>

              <p className="text-md font-semibold mt-6">{job.title.length > 20 ? job.title.slice(0, 20 ) + "..." : job.title}</p>
              <p className="text-[14px] text-[#292929]"><CiLocationOn className="text-[18px] text-[#117a5b]" /> {job.candidate_required_location}</p>
              
             
            </Link>
          );
        })}

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
      </div>
    </div>
  );
};

export default RecommendedJobs;
