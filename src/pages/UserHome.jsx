// import React from 'react'

// const UserHome = () => {


//   const url = 'https://jsearch.p.rapidapi.com/search?query=developer%20jobs%20in%20chicago&page=1&num_pages=1&country=us&date_posted=all';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': '62bb65bd21msh9f5369af392a1bdp195890jsn33d2cac32d39',
// 		'x-rapidapi-host': 'jsearch.p.rapidapi.com'
// 	}
// };

// const fetchData = async()=>{
//   try {
// 	const response = await fetch(url, options);
// 	const result = await response.json();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }


// }

// fetchData()

// console.log("hi")


//   return (
//     <div className='h-screen '>UserHome</div>
//   )
// }

// export default UserHome


import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchJobs } from '../store/jobsSlice'
import { Link } from 'react-router-dom'

const UserHome = () => {


  
  const dispatch = useDispatch()
  const {jobs, loading, error} = useSelector(state => state.jobs)
	
 
	
  const [jobArray, setJobArray] = useState([])
	const [jobsCategory, setJobsCategory] = useState([])


	// useEffect(()=>{


	// 	dispatchJobType('all')
	// 	setJobArray(jobs)
		 
	// 	if(jobs.length > 0){
	// 		const categoryMap = {};

	// 		jobs.forEach(job => {
	// 			if(categoryMap[job.category]){
	// 					categoryMap[job.category] ++;
	// 			}else{
	// 				categoryMap[job.category] = 1;
	// 			}
	// 		});

	// 		const updatedCategories = Object.entries(categoryMap).map(([category, count]) => ({
	// 			category,
	// 			numOfJobs : count
	// 		}))


	// 		setJobsCategory(updatedCategories)
	// 		console.log(jobsCategory, "hi this is ")
	// 	}
	// }, [jobArray])

	useEffect(() => {
  // Fetch jobs once
  dispatchJobType('all');
}, []); // run once on mount

useEffect(() => {
  // Process jobs when they arrive
  if (jobs.length > 0) {
    setJobArray(jobs); // optional, you can just use jobs directly

    const categoryMap = {};
    jobs.forEach(job => {
      categoryMap[job.category] = (categoryMap[job.category] || 0) + 1;
    });

    const updatedCategories = Object.entries(categoryMap).map(([category, count]) => ({
      category,
      numOfJobs: count
    }));

    setJobsCategory(updatedCategories);
  }
}, [jobs]); // run whenever jobs changes


  function dispatchJobType(job_type){
    dispatch(fetchJobs(job_type))
  }

  // useEffect(()=>{
  //   dispatchJobType()
  // }, [dispatch])



  if(loading) return <p>loading</p>
  if(error) return <p>error :  {error}</p>


  return (
    <div>

      <p>remote jobs</p>

      {/* <div className='flex justify-around'>
        <div className='border-2 h-[200px] w-[200px] rounded-lg bg-[#dcdcdc]' onClick={()=> dispatchJobType('all')}>all</div>

        <div className='border-2 h-[200px] w-[200px] rounded-lg bg-[#dcdcdc]' onClick={()=> dispatchJobType('software-dev')}>software dev</div>
        <div className='border-2 h-[200px] w-[200px] rounded-lg bg-[#dcdcdc]' onClick={()=> dispatchJobType('design')}>design</div>
        <div className='border-2 h-[200px] w-[200px] rounded-lg bg-[#dcdcdc]' onClick={()=> dispatchJobType('marketing')}>marketing</div>
      </div> */}


      <p>jobs</p>

      { 
        


		jobsCategory.map((job) => (
  <Link to={`/jobs/${encodeURIComponent(job.category)}`} key={job.category}>
    <div>
      <h3 className="font-semibold">{job.category}</h3>
      <p>{job.numOfJobs}</p>
    </div>
  </Link>
))

      }


    </div>
  )
}

export default UserHome

