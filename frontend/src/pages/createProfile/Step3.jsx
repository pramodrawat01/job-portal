import React, { useState, useEffect } from "react";
import { FiMail, FiCheckCircle } from "react-icons/fi";
import { getMe } from "../../services/api.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Step3 = () => {
  const navigate = useNavigate()
  const [signedUpUser, setSignedUpUser] = useState(
      JSON.parse(localStorage.getItem("user")) || null,
    );
  const [headline, setHeadline] = useState(
    "Jobseeker with BCA in Web Programming currently living in New Delhi",
  );
  const [selectedSuggestion, setSelectedSuggestion] = useState(1);
  const [locations, setLocations] = useState([
    "Bengaluru",
    "Noida",
    "Delhi / NCR",
  ]);
  const [salary, setSalary] = useState("4,00,000");
  const [gender, setGender] = useState("Male");
  
  const [locationInput, setLocationInput] = useState("");

  const suggestions = [
    "Jobseeker with BCA in Web Programming currently living in New Delhi",
    "Looking for jobs requiring following skills: HTML5, CSS3, JavaScript (ES6+), React.js, Redux, Tailwind CSS, Bootstrap, RESTful APIs, Git & GitHub, Responsive Web Design, DOM Manipulation, JSON, Axios, npm/yarn, Version Control",
  ];
  const locationSuggestions = [
    "Mumbai",
    "Pune",
    "Chennai",
    "Hyderabad",
    "Gurugram",
    "Ahmedabad",
    "Kolkata",
    "Remote",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/v1/register/preferences`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resumeHeadline: headline,
            preferredLocations: locations,
            preferredSalary: salary,
            gender,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      console.log(data);

      toast.success("Profile preferences submitted!");
      navigate('/userHome')
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  // convert salary amount

    const convertToIndianWords = (num) => {
    if (!num) return "";

    if (num >= 10000000) {
      return `${(num / 10000000).toFixed(1)} crore`;
    }

    if (num >= 100000) {
      return `${(num / 100000).toFixed(1)} lakh`;
    }

    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)} thousand`;
    }

    return num.toString();
  };

  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        console.log("user data found : ", data.user);
        if (data?.success && data?.user) {
          setSignedUpUser(data.user); // set the already-logged-in user
        }
      } catch (error) {
        console.log("server not responded : ", error.message);
      }
    };
    fetchUser();
  }, []);

  return (
    
        <div className="w-full  rounded-2xl p-8">
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
                  <span className="text-gray-700 text-sm leading-relaxed">
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Preferred Work Locations */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred work locations (Maximum 10){" "}
              <span className="text-red-500">*</span>
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
                    onClick={() =>
                      setLocations(locations.filter((l) => l !== loc))
                    }
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
              value={locationInput}
              placeholder="Eg. Chennai, Bangalore, Mumbai"
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
              onChange={(e) => setLocationInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && locationInput.trim()) {
                  e.preventDefault()

                  const newLocation =
                    locationInput.trim().charAt(0).toUpperCase() +
                    locationInput.trim().slice(1).toLowerCase();

                  if (
                    !locations.includes(newLocation) &&
                    locations.length < 10
                  ) {
                    setLocations([...locations, newLocation]);
                  }
                  setLocationInput("")
                }
              }}
            />

            {/* Suggestions */}
            <div className="mt-4 flex flex-wrap gap-3">
              {locationSuggestions
              .filter(
                (sugg) => 
                  !locations.some(
                    (loc) => loc.toLowerCase() === sugg.toLowerCase()
                  )
              )
              .map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (
                      !locations.includes(suggestion) &&
                      locations.length < 10
                    ) {
                      setLocations([...locations, suggestion]);
                    }
                  }}
                  className={`px-4 py-1.5 rounded-full border text-sm transition-all ${
                    locations.includes(suggestion) 
                    || suggestion.toLowerCase() === locationInput.toLowerCase()
                      ? "bg-green-100 border-green-400 text-green-700 cursor-default"
                      : "border-gray-300 text-gray-700 hover:border-green-400 hover:text-green-700"
                  }`}
                >
                  {suggestion} {locations.includes(suggestion) || 
                  suggestion.toLowerCase()  === locationInput.toLowerCase()
                  ? "✓" : "+"}
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
            <p className="text-green-600 text-sm mt-2">
              {
                convertToIndianWords(
                  Number(salary.replace(/,/g, ""))
                )
              }
            </p>
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
  );
};

export default Step3;
