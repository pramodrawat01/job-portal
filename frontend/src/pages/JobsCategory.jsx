

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { data, Link, useParams } from 'react-router-dom'
import { CiLocationOn } from "react-icons/ci";


const jobsCategory = () => {

  const dispatch = useDispatch()
  
  const {category} = useParams()

  const decodedCategory = decodeURIComponent(category)

  const {jobs} = useSelector(state => state.jobs)

  
  const [jobsCategory, setJobsCategory] = useState([])

  useEffect(()=>{

    const filteredJobs = jobs?.filter(job => (
      job.category === decodedCategory
    ))


    setJobsCategory(filteredJobs)
  },[category])


console.log("Jobs here", jobsCategory)

  return (
    <div>

    <div className='mt-[10px] text-3xl font-semibold'>Find Jobs related to {decodedCategory}</div>

      {
        jobsCategory.length > 0  && 
        jobsCategory.map(job => {

          const publishedDate = new Date(job.publication_date)
          const now = new Date();
          const diffMs = now - publishedDate;
          const diffDays = Math.floor(diffMs /(1000 * 60 * 60 * 24))


         return (
          <Link key={job.id} to={`/jobs/${encodeURIComponent(job.category)}/applyto/${job.id}`}>

         
          <div
      
            className="block bg-white shadow-md rounded-xl p-4 mb-4 hover:shadow-lg transition-all duration-200 border border-gray-200 mt-4"
            >
            {/* Header row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                src={job.company_logo || ""}
                alt="logo"
                className="h-16 w-16 object-contain border-1 rounded-full border-[#aaaaaa]"
                />
                <div>
                  <h3 className="text-xl font-semibold text-black truncate">
                      {job.title}
                  </h3>
                  <p className="text-md text-[#373737] font-semibold">{job.company_name}</p>
                </div>
              </div>


            </div>

            {/* Tags */}
            <p className="text-md text-[#646363] mt-2">
                {job.tags.join("   • ")}
            </p>

            {/* Salary */}
            <p className="text-md text-gray-700 mt-2">
                <span className="font-semibold">Salary:</span>{" "}
                {job.salary ? job.salary : "Not disclosed"}
            </p>

            <div className='text-md flex items-center gap-2 mt-2'>
                <CiLocationOn className='text-2xl'/>
                <div> {job.candidate_required_location   }</div>
           </div>

            <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 underline hover:text-blue-800"
                onClick={(e) => e.stopPropagation()} // ✅ prevent Link navigation
                >
                View Job
                </a>
                <p>{diffDays} days ago</p>
            </div>
            </div>
           </Link>
           )
      })
      }
    </div>
  )
}

export default jobsCategory