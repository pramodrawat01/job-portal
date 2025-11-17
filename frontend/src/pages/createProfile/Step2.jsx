import React, { useState } from "react";
import { useSelector } from "react-redux";



const Step2 = () => {

  const {id} = useSelector(state => state.signup?.user)
  const [form, setForm] = useState({
    highest_qualification : "",
    course : "",
    course_type : "",
    specialization : "",
    university: "",
    starting_year : "",
    passing_year : "",
    cgpa : "",
    key_skills : [],
    resume : "",
    portfolio : ""

  })

  function handleOnchange (e){
    const {name, value, files} = e.target

    if(name === 'resume'){
      setForm(prev => ({...prev, resume : files[0]}) )
    }
    else{
      setForm( prev => ({...prev, [name] : value })
      )
    }
  }



  async function handleSubmit(){
    const fd = new FormData();
    
    fd.append("highest_qualification", form.highest_qualification);
    fd.append("course", form.course);
    fd.append("course_type", form.course_type);
    fd.append("specialization", form.specialization);
    fd.append("university", form.university);
    fd.append("starting_year", form.starting_year);
    fd.append("passing_year", form.passing_year);
    fd.append("cgpa", form.cgpa);
    fd.append("key_skills", form.key_skills);
    fd.append("portfolio", form.portfolio);

    fd.append('resume', form.resume)

    const res = await fetch('',{
      method : "POST",
      header : {
        'Content-type' : 'application/json' 
      },
      body : JSON.stringify({fd, id})
    })
    const data = await res.json()
    console.log([...fd.entries()]);

  }
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
                name="highest_qualification"
                value={form.highest_qualification}
                onChange={handleOnchange}
                type="text"
                placeholder="Graduation/Diploma"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Course */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Name<span className="text-red-500">*</span>
              </label>
              <input
                name="course"
                value={form.course}
                onChange={handleOnchange}
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
                name="course_type"
                value={form.course_type}
                onChange={handleOnchange}
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
                name="specialization"
                value={form.specialization}
                onChange={handleOnchange}
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
                name="university"
                value={form.university}
                onChange={handleOnchange}
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
                name="starting_year"
                value={form.starting_year}
                onChange={handleOnchange}
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
                name="passing_year"
                value={form.passing_year}
                onChange={handleOnchange}
                type="text"
                placeholder="2021"  
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CGPA out of 10<span className="text-red-500">*</span>
              </label>
              <input
                name="cgpa"
                value={form.cgpa}
                onChange={handleOnchange}
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
                name="key_skills"
                value={form.key_skills}
                onChange={handleOnchange}
                type="text"
                placeholder="key skills are crucial for recruiters to hire you"  
                className="w-full border border-gray-300 rounded-lg p-2 py-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Your Resume<span className="text-red-500">*</span>
              </label>
              <input
                name="resume"
                onChange={handleOnchange}
                type="file"
                placeholder="upload your resime"  
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Add your Portfolio Link
              </label>
              <input
                name="portfolio"
                value={form.portfolio}
                onChange={handleOnchange} 
                type="text"
                placeholder="add your portfolio"  
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button 
              onClick={handleSubmit}
              className="px-4 py-2 rounded-xl bg-green-800 text-white">Save and Continue</button>
          </form>
        </div> 
      </div>
    </div>
  );
};

export default Step2;
