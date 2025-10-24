// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchJobs } from '../store/jobsSlice'
// import { Link } from 'react-router-dom'

// const Jobs = () => {
  
//   const dispatch = useDispatch()
//   const {jobs, loading, error} = useSelector(state => state.jobs)

//   function dispatchJobType(job_type){
//     dispatch(fetchJobs(job_type))
//   }

//   // useEffect(()=>{
//   //   dispatchJobType()
//   // }, [dispatch])



//   if(jobs) console.log("jobs", jobs)

//   if(loading) return <p>loading</p>
//   if(error) return <p>error :  {error}</p>


//   return (
//     <div>

//       <p>remote jobs</p>

//       <div className='flex justify-around'>
//         <div className='border-2 h-[200px] w-[200px] rounded-lg bg-[#dcdcdc]' onClick={()=> dispatchJobType('all')}>all</div>

//         <div className='border-2 h-[200px] w-[200px] rounded-lg bg-[#dcdcdc]' onClick={()=> dispatchJobType('software-dev')}>software dev</div>
//         <div className='border-2 h-[200px] w-[200px] rounded-lg bg-[#dcdcdc]' onClick={()=> dispatchJobType('design')}>design</div>
//         <div className='border-2 h-[200px] w-[200px] rounded-lg bg-[#dcdcdc]' onClick={()=> dispatchJobType('marketing')}>marketing</div>
//       </div>


//       <p>jobs</p>
//       {
//         jobs?.slice(0, 10).map((job) =>(

//           <Link to={`/jobs/${encodeURIComponent(job.category)}`}>
//           <div key={job.id}>

//             <h3 className="font-semibold">{job.title}</h3>
//             <p>{job.company_name}</p>

//             <a
//               href={job.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 underline"
//             >
//               View Job
//             </a>
//           </div>
//           </Link>
//         ))
//       }
//     </div>
//   )
// }

// export default Jobs






// // src/pages/Jobs.jsx
// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchJobs } from '../store/jobsSlice'

// const Jobs = () => {
//   const dispatch = useDispatch()
//   const { jobs, loading, error } = useSelector((state) => state.jobs)

//   useEffect(() => {
//     dispatch(fetchJobs('software-dev'))
//   }, [dispatch])

//   if (loading) return <p>Loading jobs...</p>
//   if (error) return <p>Error: {error}</p>

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-3">Remote Jobs</h2>
//       {jobs.slice(0, 10).map((job) => (
//         <div key={job.id} className="border p-3 rounded mb-2">
//           <h3 className="font-semibold">{job.title}</h3>
//           <p>{job.company_name}</p>
//           <a
//             href={job.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-600 underline"
//           >
//             View Job
//           </a>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default Jobs


import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { data, Link, useParams } from 'react-router-dom'

const Jobs = () => {


  
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

      {
        jobsCategory.length > 0  && 
        jobsCategory.map(job => {

          const publishedDate = new Date(job.publication_date)
          const now = new Date();
          const diffMs = now - publishedDate;
          const diffDays = Math.floor(diffMs /(1000 * 60 * 60 * 24))


         return (
          <Link key={job.id} to={`/jobs/${encodeURIComponent(job.category)}/applyto/${job.id}`}>

         
          <div >
              <p className='text-2xl '>{job.title}</p>
              <p>{job.company_name}</p>
              <img src={job.company_logo} alt='company logo'/>

              <p> {`${job.tags.join(", ")}`}</p>

              salary :
              {
                job.salary == "" ?
               <p> not disclosed</p> :
               <p>{job.salary}</p>
              }

              <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Job
            </a>


            <p>{diffDays}  Days Ago</p>
            
          </div>
           </Link>
           )
      })
      }
    </div>
  )
}

export default Jobs