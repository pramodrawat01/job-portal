import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const ApplySection = () => {

  const {id, category} = useParams()

  const decodedCategory = decodeURIComponent(category)


  console.log(decodedCategory,id, "a;slkdfjdkaddsj")
  const [job, setJob] = useState([])
  

  const {jobs} = useSelector(state => state.jobs)

  console.log(jobs, "jobs in apply section")

  const filterJob = jobs.find( job =>Number( job.id) === Number(id) && job.category === decodedCategory)


  if(filterJob) console.log("find jobs heer",filterJob)

  useEffect(()=>{
    const getJob = async()=>{
      const response = await fetch(``)
      const data = await response.json()

      console.log(data, "one job ")


    }


    getJob()
  }, [id])
  return (
    <div>ApplySection</div>
  )
}

export default ApplySection