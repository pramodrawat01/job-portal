import React from "react";

const Step2 = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 mt-[100px]">
      <div className="w-[90%] md:w-[80%] lg:w-[70%] flex flex-col md:flex-row gap-5">
        {/* Left Section */}
        <div className="md:w-1/3 h-[400px] bg-white rounded-2xl shadow p-6">
          <div className="flex flex-col items-start space-y-10">
            {/* Step 1 */}
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-green-500"></div>
              <div>
                <h4 className="font-medium text-gray-800">Basic details</h4>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-green-500"></div>
              <div>
                <h4 className="font-medium text-gray-800">Education</h4>
                <p className="text-sm text-gray-500">
                  Employers prefer to know about your education
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-gray-400"></div>
              <div>
                <h4 className="font-medium text-gray-800">Last step</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-2/3 bg-white rounded-2xl shadow p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Education details
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            These details help recruiters identify your background
          </p>

          <form className="space-y-5">
            {/* Highest qualification */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Highest qualification/Degree currently pursuing<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Graduation/Diploma"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Course */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="BCA"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Course type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course type<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Full Time"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Specialization */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specialization<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Web Programming"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* University */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                University / Institute<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Lal Bahadur Shastri College"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Starting Year<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="2021"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Passing Year<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="2021"  
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Grading System<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="scale 10 grading system"  
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CGPA out of 10<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="9"  
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Key Skills<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="key skills are crucial for recruiters to hire you"  
                className="w-full border border-gray-300 rounded-lg p-2 py-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button className="px-4 py-2 rounded-xl bg-green-800 text-white">Save and Continue</button>
          </form>
        </div> 
      </div>
    </div>
  );
};

export default Step2;
