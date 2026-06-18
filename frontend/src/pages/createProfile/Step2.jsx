import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FiMail, FiCheckCircle } from "react-icons/fi";
import { getMe } from "../../services/api.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Step2 = () => {
  const [signedUpUser, setSignedUpUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );

  const navigate = useNavigate()

  const { id } = useSelector((state) => state.signup?.user);
  const [form, setForm] = useState({
    highest_qualification: "",
    course: "",
    course_type: "",
    specialization: "",
    university: "",
    starting_year: "",
    passing_year: "",
    cgpa: "",
    key_skills: [],
    resume: "",
    portfolio: "",
  });

  function handleOnchange(e) {
    const { name, value, files } = e.target;

    if (name === "resume") {
      setForm((prev) => ({ ...prev, resume: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
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
  
      fd.append("resume", form.resume);
  
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/v1/register/education`,
        {
          method: "POST",
          credentials : "include",
          body: fd,
        });
      const data = await res.json();
      if(res.ok){
        console.log(res.message)
        navigate('/user/completeProfile')
      }
      // console.log([...fd.entries()]);
    } catch (error) {
      toast.error(error.message )
    }
  }

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
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 mt-[80px] ">
      <div className="w-[90%] md:w-[80%] lg:w-[70%] flex flex-col md:flex-row gap-12 ">
        {/* Left illustration / info section */}
        <div className="h-[450px] w-[340px] bg-white shadow-md border border-green-100 rounded-2xl p-6 flex flex-col justify-center items-start self-start">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
            alt="Illustration"
            className="w-40 mx-auto mb-6"
          />
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            On registering, you can
          </h2>
          <ul className="space-y-3 text-gray-600 text-[15px]">
            <li className="flex items-center gap-2">
              <FiCheckCircle className="text-green-700" size={18} />
              Build your profile and let recruiters find you
            </li>
            <li className="flex items-center gap-2">
              <FiCheckCircle className="text-green-700" size={18} />
              Get job postings delivered right to your email
            </li>
            <li className="flex items-center gap-2">
              <FiCheckCircle className="text-green-700" size={18} />
              Find a job and grow your career
            </li>
          </ul>
        </div>

        <div className="md:w-2/3">
          <div className="flex mb-4 flex-col gap-2 w-full bg-white rounded-2xl shadow-md border border-green-100 px-4 py-2">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Verify Email", done: signedUpUser.step1Completed },
                { label: "Education", done: signedUpUser.step2Completed },
                { label: "Step 3", done: signedUpUser.step3Completed },
              ].map(({ label, done }) => (
                <div
                  key={label}
                  className={`p-3 rounded-xl border text-center text-sm font-medium ${
                    done
                      ? "bg-green-50 border-green-700 text-green-800"
                      : "bg-gray-50 border-gray-200 text-gray-400"
                  }`}
                >
                  {done ? <FiCheckCircle className="inline mr-1" /> : "○"}{" "}
                  {label}
                </div>
              ))}
            </div>
          </div>

        <div className=" bg-white rounded-2xl shadow p-8">
          {/* Right Section */}
          <div className=" bg-white rounded-2xl">
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
                  Highest qualification/Degree currently pursuing
                  <span className="text-red-500">*</span>
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
                  placeholder="B-Tech"
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
                  placeholder="AI & Machinie Learning"
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
                  placeholder="Delhi Univercity"
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
                  placeholder="2025"
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
                className="px-4 py-2 rounded-xl bg-green-800 text-white"
              >
                Save and Continue
              </button>
            </form>
          </div>
        </div>

        </div>

      </div>
    </div>
  );
};

export default Step2;
