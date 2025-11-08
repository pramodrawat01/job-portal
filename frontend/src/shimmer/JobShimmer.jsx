// src/components/JobShimmer.jsx
import React from "react";

const JobShimmer = () => {
  const shimmerArray = Array.from({ length: 6 });

  return (
    <div className="flex flex-col gap-4 mt-6">
      {shimmerArray.map((_, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-xl p-4 animate-pulse border border-gray-200"
        >
          {/* Header Section */}
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-gray-300 rounded-full"></div>
            <div className="flex flex-col gap-2">
              <div className="h-4 w-40 bg-gray-300 rounded"></div>
              <div className="h-3 w-28 bg-gray-300 rounded"></div>
            </div>
          </div>

          {/* Tags */}
          <div className="h-3 w-3/4 bg-gray-300 rounded mt-3"></div>

          {/* Salary */}
          <div className="h-3 w-1/2 bg-gray-300 rounded mt-3"></div>

          {/* Location */}
          <div className="h-3 w-1/3 bg-gray-300 rounded mt-3"></div>

          {/* Footer */}
          <div className="flex justify-between items-center mt-4">
            <div className="h-3 w-20 bg-gray-300 rounded"></div>
            <div className="h-3 w-16 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobShimmer;
