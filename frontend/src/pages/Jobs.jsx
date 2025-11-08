import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiLocationOn } from "react-icons/ci";
import { fetchJobs } from "../store/jobsSlice";
import { Link } from "react-router-dom";
import JobShimmer from "../shimmer/JobShimmer";

const Jobs = () => {
  const { jobs } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  // 👇 local state for pagination
  const [visibleCount, setVisibleCount] = useState(15);

  useEffect(() => {
    dispatch(fetchJobs("all")); // fetch once
  }, [dispatch]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 15); // show 25 more each time
  };

  const visibleJobs = jobs?.slice(0, visibleCount);

  return (
    <div className="p-6 bg-[#f8f9fa] min-h-screen mt-[100px] ">
      <h2 className="text-2xl font-semibold mb-6 text-[#117a5b]">
        💼 All Jobs
      </h2>

      {visibleJobs && visibleJobs.length > 0 ? (
        <>
          <div className="flex flex-col gap-4">
            {visibleJobs?.length > 0 &&  
              visibleJobs?.map((job) => {
                const publishedDate = new Date(job.publication_date);
                const now = new Date();
                const diffMs = now - publishedDate;
                const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

                return (
                  <Link
                    key={job.id}
                    to={`/jobs/${encodeURIComponent(job.category)}/applyto/${
                      job.id
                    }`}
                  >
                    <div className="block bg-white shadow-md rounded-xl p-4 mb-4 hover:shadow-lg transition-all duration-200 border border-gray-200 mt-4">
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
                            <p className="text-md text-[#373737] font-semibold">
                              {job.company_name}
                            </p>
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

                      <div className="text-md flex items-center gap-2 mt-2">
                        <CiLocationOn className="text-2xl" />
                        <div> {job.candidate_required_location}</div>
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
                );
              })}
          </div>

          {/* Load More Button */}
          {visibleCount < jobs.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                className="bg-[#117a5b] text-white px-6 py-2 rounded-full hover:bg-[#0d5f47] transition-all duration-200"
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <JobShimmer/>
      )}
    </div>
  );
};

export default Jobs;
