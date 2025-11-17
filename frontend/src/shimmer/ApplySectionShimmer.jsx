import React from "react";

const ApplySectionShimmer = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 flex justify-center mt-[100px]">
      <div className="bg-white w-full max-w-3xl shadow-md rounded-2xl p-8 animate-pulse">
        {/* Header shimmer */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <div className="h-6 w-3/4 bg-gray-300 rounded mb-3"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 w-1/4 bg-gray-200 rounded"></div>
        </div>

        {/* Job Meta shimmer */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
          <div className="h-4 w-28 bg-gray-200 rounded"></div>
          <div className="h-4 w-36 bg-gray-200 rounded col-span-2"></div>
        </div>

        {/* Description shimmer */}
        <div className="space-y-3 mb-8">
          <div className="h-5 w-40 bg-gray-300 rounded mb-4"></div>
          <div className="h-3 w-full bg-gray-200 rounded"></div>
          <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
          <div className="h-3 w-4/6 bg-gray-200 rounded"></div>
          <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
        </div>

        {/* Tags shimmer */}
        <div className="flex gap-3 flex-wrap mb-10">
          <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
          <div className="h-5 w-24 bg-gray-200 rounded-full"></div>
          <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
        </div>

        {/* Button shimmer */}
        <div className="flex justify-center">
          <div className="h-10 w-40 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default ApplySectionShimmer;
