import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const AppliedHistory = () => {

  const { appliedJobs } = useSelector(state => state.jobHistory)

  const johHistory = JSON.parse(localStorage.getItem("appliedJobs"))
  const [history, setHistory] = useState(johHistory || appliedJobs || [])

  console.log(history, "this is my history!")

  return (
    <div className=" mt-[100px] min-h-[400px] px-[120px]">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Companies You Have Applied To 
      </h2>

      {
        history && history?.appliedJobs?.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {history.appliedJobs.map((job, index) => (
              <div
                key={job.id || index}
                className="flex items-start gap-4 p-4 border rounded-2xl shadow-sm hover:shadow-md transition"
              >
                {/* Company Logo */}
                <img
                  src={job.company_logo || job.company_logo_url}
                  alt={job.company_name}
                  className="w-16 h-16 rounded-lg object-contain bg-gray-50 border"
                />

                {/* Job Info */}
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-900">{job.company_name}</h3>
                  <p className="text-sm text-gray-600">{job.title}</p>
                  <p className="text-sm text-gray-500">
                    {job.candidate_required_location} • {job.category}
                  </p>
                  {job.salary && (
                    <p className="text-sm text-green-600 font-medium mt-1">{job.salary}</p>
                  )}

                  {/* Job Link */}
                  {/* <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm mt-2 hover:underline"
                  >
                    View Job ↗
                  </a> */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500">No applied jobs yet...</div>
        )
      }
    </div>
  )
}

export default AppliedHistory
