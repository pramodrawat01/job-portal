import React from 'react'
import { useSelector } from 'react-redux'

const AppliedHistory = () => {

    const {appliedJobs} = useSelector(state => state.jobHistory)

    console.log(appliedJobs, "this is my history!")
  return (
    <div>AppliedHistory</div>
  )
}

export default AppliedHistory