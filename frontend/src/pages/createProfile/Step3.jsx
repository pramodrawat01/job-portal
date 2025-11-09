import React, { useState } from "react";

const Step3 = () => {
  const [headline, setHeadline] = useState(
    "Jobseeker with BCA in Web Programming currently living in New Delhi"
  );
  const [selectedSuggestion, setSelectedSuggestion] = useState(1);
  const [locations, setLocations] = useState(["Bengaluru", "Noida", "Delhi / NCR"]);
  const [salary, setSalary] = useState("4,00,000");
  const [gender, setGender] = useState("Male");

  const suggestions = [
    "Jobseeker with BCA in Web Programming currently living in New Delhi",
    "Looking for jobs requiring following skills: HTML5, CSS3, JavaScript (ES6+), React.js, Redux, Tailwind CSS, Bootstrap, RESTful APIs, Git & GitHub, Responsive Web Design, DOM Manipulation, JSON, Axios, npm/yarn, Version Control"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile preferences submitted!");
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center px-6 py-12 mt-[80px] gap-5">

      {/* Left Section */}
        <div className="md:w-1/4 flex flex-col self-start h-[400px] bg-white rounded-2xl shadow p-6  ">
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
              <div className="w-5 h-5 rounded-full bg-green-500 "></div>
              <div>
                <h4 className="font-medium text-gray-800">Education</h4>
                <p className="text-sm text-gray-500">
                  Employers prefer to know about your education
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-green-500"></div>
              <div>
                <h4 className="font-medium text-gray-800">Last step</h4>
              </div>
            </div>
          </div>
        </div>

      <div className="w-full max-w-3xl bg-white border border-gray-200 shadow-md rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Add headline & preferences
        </h2>
        <p className="text-gray-600 mb-6">
          Make your profile stronger to get more relevant job recommendations
        </p>

        {/* Resume Headline */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resume headline <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
          />

          {/* Suggestions */}
          <div className="mt-4 space-y-3">
            {suggestions.map((s, index) => (
              <div
                key={index}
                onClick={() => {
                  setHeadline(s);
                  setSelectedSuggestion(index);
                }}
                className={`cursor-pointer p-4 border rounded-lg transition-all ${
                  selectedSuggestion === index
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="suggestion"
                  checked={selectedSuggestion === index}
                  readOnly
                  className="mr-2 accent-green-600"
                />
                <span className="text-gray-700 text-sm leading-relaxed">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Preferred Work Locations */}
<div className="mb-8">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Preferred work locations (Maximum 10) <span className="text-red-500">*</span>
  </label>

  {/* Selected locations */}
  <div className="flex flex-wrap gap-2 mb-3">
    {locations.map((loc, index) => (
      <div
        key={index}
        className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
      >
        <span>{loc}</span>
        <button
          onClick={() => setLocations(locations.filter((l) => l !== loc))}
          className="text-green-700 hover:text-green-900"
        >
          ✕
        </button>
      </div>
    ))}
  </div>

  {/* Manual input for adding new location */}
  <input
    type="text"
    placeholder="Eg. Chennai, Bangalore, Mumbai"
    className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
    onKeyDown={(e) => {
      if (e.key === "Enter" && e.target.value.trim() !== "") {
        const newLocation = e.target.value.trim();
        if (!locations.includes(newLocation) && locations.length < 10) {
          setLocations([...locations, newLocation]);
        }
        e.target.value = "";
      }
    }}
  />

  {/* Suggestions */}
  <div className="mt-4 flex flex-wrap gap-3">
    {[
      "Mumbai",
      "Pune",
      "Chennai",
      "Hyderabad",
      "Gurugram",
      "Ahmedabad",
      "Kolkata",
      "Remote",
    ].map((suggestion, index) => (
      <button
        key={index}
        onClick={() => {
          if (!locations.includes(suggestion) && locations.length < 10) {
            setLocations([...locations, suggestion]);
          }
        }}
        className={`px-4 py-1.5 rounded-full border text-sm transition-all ${
          locations.includes(suggestion)
            ? "bg-green-100 border-green-400 text-green-700 cursor-default"
            : "border-gray-300 text-gray-700 hover:border-green-400 hover:text-green-700"
        }`}
      >
        {suggestion} {locations.includes(suggestion) ? "✓" : "+"}
      </button>
    ))}
  </div>
</div>

{/* Preferred Salary */}
<div className="mb-8">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Preferred salary <span className="text-red-500">*</span>
  </label>
  <div className="flex items-center gap-3">
    <span className="text-xl">₹</span>
    <input
      type="text"
      value={salary}
      onChange={(e) => setSalary(e.target.value)}
      className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 w-1/3"
    />
    <span className="text-gray-600">per year</span>
  </div>
  <p className="text-green-600 text-sm mt-2">Four lakh rupees</p>
</div>


        {/* Gender */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-4">
            {["Male", "Female", "Other"].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGender(g)}
                className={`px-4 py-2 rounded-full border ${
                  gender === g
                    ? "bg-green-100 text-green-800 border-green-500"
                    : "border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-all"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Step3;
