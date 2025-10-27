import React from "react";

const UserHomeShimmer = () => {
  const shimmerCards = Array(3).fill(null); // number of loading cards

  return (
    <div className="p-4 w-full h-full">
      {/* Shimmer header */}
      <div className="h-6 w-56 bg-gray-200 rounded-md mb-6 animate-pulse"></div>

      {/* Shimmer cards container */}
<div className="flex gap-6 overflow-x-auto">
  {shimmerCards.map((_, index) => (
    <div
      key={index}
      className={`${
        index === Math.floor(shimmerCards.length / 2)
          ? "w-[650px] h-[600px]" // middle featured shimmer card
          : "w-[400px] h-[600px]"
      } bg-white shadow-md rounded-2xl p-6 animate-pulse flex flex-col justify-between`}
    >
      {/* Top Section - Company Logo & Info */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
        <div className="flex flex-col gap-2">
          <div className="h-4 w-40 bg-gray-300 rounded"></div>
          <div className="h-3 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Job Title */}
      <div className="h-6 w-3/4 bg-gray-300 rounded mb-4"></div>

      {/* Short Description (3–4 lines) */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="h-3 w-full bg-gray-200 rounded"></div>
        <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
        <div className="h-3 w-4/6 bg-gray-200 rounded"></div>
        <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
      </div>

      {/* Tags Section */}
      <div className="flex gap-3 flex-wrap mb-6">
        <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
        <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
        <div className="h-5 w-24 bg-gray-200 rounded-full"></div>
        <div className="h-5 w-12 bg-gray-200 rounded-full"></div>
      </div>

      {/* Salary & Posted Info */}
      <div className="flex justify-between mb-8">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
        <div className="h-4 w-16 bg-gray-200 rounded"></div>
      </div>

      {/* View Job Button Placeholder */}
      <div className="h-10 w-32 bg-gray-300 rounded-lg mx-auto"></div>
    </div>
  ))}
</div>

    </div>
  );
};

export default UserHomeShimmer;
