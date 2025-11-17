import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ApplySectionShimmer from '../shimmer/ApplySectionShimmer'
import { addJob } from '../store/applicationSlice'
import { saveJob } from '../store/saveJobSlice'

const ApplySection = () => {

  const {id, category} = useParams()
  const[loading, setLoading] = useState(false)

  const decodedCategory = decodeURIComponent(category)

  const [jobCaregoryArray, setJobsCategoryArray] = useState([])
  const [jobFound, setJobFound] = useState(null)

  const dispatch = useDispatch()

  // fetch jobs based on particular category

  useEffect(()=>{
    const getJobsCaregory = async()=>{
      try{
        setLoading(true)
        const response = await fetch(`https://remotive.com/api/remote-jobs?category=${decodedCategory}&limit=50`)
        const data = await response.json()

        // console.log("category data", data)

        setJobsCategoryArray(data.jobs)
        setLoading(false)
      }
      catch(error){

        console.log(error, "failed to fetch job for particular category")
      }
    }

    getJobsCaregory()
   
  }, [category])

  


  useEffect(()=>{

    const  filterJob = jobCaregoryArray?.filter( job => (
      Number(job.id) === Number(id)
    ))

    console.log(filterJob, "filter job")

    setJobFound(filterJob)
    
  }, [id, jobCaregoryArray])

  // console.log("all jobs found",jobCaregoryArray)
  // console.log("new job found",jobFound)






  console.log(decodedCategory,id, "a;slkdfjdkaddsj")
  const [job, setJob] = useState([])
  

  const {jobs} = useSelector(state => state.jobs)

  // console.log(jobs, "jobs in apply section")

  const filterJob = jobs.find( job =>Number( job.id) === Number(id) && job.category === decodedCategory)


  // if(filterJob) console.log("find jobs heer",filterJob)

  useEffect(()=>{
    const getJob = async()=>{
      const response = await fetch(``)
      const data = await response.json()

      console.log(data, "one job ")


    }


    getJob()
  }, [id])

  const appliedJobs = (job)=>{
    console.log("clicked")
    dispatch(addJob(job)) 
  }


  const handleSave = ()=> {
    alert('job saved !')
    dispatch(saveJob({ job: job }))
  }
  
        


  if(loading) return <ApplySectionShimmer/>
  return (
   <div className="min-h-screen bg-gray-50 py-1 flex justify-center mt-[120px] px-[150px]">
  <div className="bg-white w-full  shadow-md rounded-2xl p-8">
    {jobFound && jobFound.length > 0 ? (
      jobFound.map((job, index) => (
        <div key={index} className="space-y-6">
          {/* Header section */}
          <div className="border-b border-gray-200 pb-4">
            <div className='flex justify-between '>
              <h1 className="text-2xl font-bold text-gray-800 ">{job.title}</h1>
              <button
              className='cursor-pointer border-1 px-4 rounded-md border-[#d0d0d0] hover:border-[#525252] transition duration-300'
               onClick={() => handleSave() } 
             >
                save
              </button>
            </div>
            
            <p className="text-lg text-gray-700 mt-1">{job.company_name}</p>
            <p className="text-sm text-gray-500">{job.category}</p>
          </div>

          {/* Job Meta Information */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <p>
              <span className="font-semibold text-gray-800">Type:</span>{" "}
              {job.job_type || "N/A"}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Published on:</span>{" "}
              {new Date(job.publication_date).toLocaleDateString()}
            </p>
            <p className="col-span-2">
              <span className="font-semibold text-gray-800">Salary:</span>{" "}
              {job.salary ? (
                <span className="text-green-700">{job.salary}</span>
              ) : (
                "Not disclosed"
              )}
            </p>
          </div>

          {/* Description Section */}
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Job Description
            </h2>
            <div
              dangerouslySetInnerHTML={{
                __html: job.description,
              }}
            ></div>
          </div>

          {/* Apply Button */}
          <div className="flex mt-6">
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#117a5b] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0f664b] transition duration-300"
              onClick={()=> appliedJobs(job)}
            >
              Easy Apply
            </a>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-600">loading</p>
    )}
  </div>
</div>

  )
}

export default ApplySection