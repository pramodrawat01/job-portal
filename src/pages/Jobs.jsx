import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchJobs } from '../store/jobsSlice'

const Jobs = () => {
  
  const dispatch = useDispatch()
  const {jobs, loading, error} = useSelector(state => state.jobs)


  useEffect(()=>{
    dispatch(fetchJobs('software-dev'))

  }, [dispatch])



  if(jobs) console.log("jobs", jobs)

  if(loading) return <p>loading</p>
  if(error) return <p>error :  {error}</p>


  return (
    <div>

      <p>remote jobs</p>
      {
        jobs?.slice(0, 10).map((job) =>(
          <div key={job.id}>
            <h3 className="font-semibold">{job.title}</h3>
            <p>{job.company_name}</p>

            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Job
            </a>
          </div>
        ))
      }
    </div>
  )
}

export default Jobs






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
