import React from "react";

const Companies = () => {
  const companies = [
    {
      id: 1,
      name: "Google",
      logo: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
      role: "Frontend Developer",
      location: "Bangalore, India",
    },
    {
      id: 2,
      name: "Microsoft",
      logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png",
      role: "Software Engineer",
      location: "Hyderabad, India",
    },
    {
      id: 3,
      name: "Amazon",
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968260.png",
      role: "Full Stack Developer",
      location: "Pune, India",
    },
    {
      id: 4,
      name: "Netflix",
      logo: "https://cdn-icons-png.flaticon.com/512/5977/5977590.png",
      role: "React Developer",
      location: "Remote",
    },
  ];

  return (
    <div className="mt-[100px] px-10">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">
        Top Companies Hiring 
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {companies.map((company) => (
          <div
            key={company.id}
            className="bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-200 p-6 rounded-2xl flex flex-col items-center text-center"
          >
            <img
              src={company.logo}
              alt={company.name}
              className="w-16 h-16 object-contain mb-4"
            />
            <h3 className="text-xl font-semibold">{company.name}</h3>
            <p className="text-gray-500">{company.role}</p>
            <p className="text-sm text-gray-400 mt-2">{company.location}</p>
            <button className="mt-4 bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Companies;
