// import React from 'react'
// import { useSelector } from 'react-redux'

// const SavedJobs = () => {
//     const {savedJobs} = useSelector(state => state.saveJob)
//     console.log(savedJobs, "this is your saved jobs")
//   return (
//     <div>SavedJobs</div>
//   )
// }

// export default SavedJobs



import React from "react";
import { useSelector } from "react-redux";

const SavedJobs = () => {
  const { savedJobs } = useSelector((state) => state.saveJob || { savedJobs: [] });

  if (!savedJobs) {
    return <p>Loading saved jobs...</p>; // while Redux Persist rehydrates
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Saved Jobs</h2>
      {savedJobs.length > 0 ? (
        savedJobs.map((job, i) => (
          <div key={i} className="p-2 border-b border-gray-200">
            {job.title}
          </div>
        ))
      ) : (
        <p>No saved jobs yet</p>
      )}
    </div>
  );
};

export default SavedJobs;
