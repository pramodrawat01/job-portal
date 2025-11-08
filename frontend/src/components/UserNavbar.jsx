import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import Overlay from "./Overlay";
import ProfileCompo from "./ProfileCompo";
import logo from "../assets/logo1.png";
// import { selectFilteredJobs } from '../store/searchSlice';


const UserNavbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [text, setText] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const { jobs } = useSelector((state) => state?.jobs);
  // console.log(jobs, "inside navbar");

  const dispatch = useDispatch();

  // console.log(searchValue, "this is store value");

  // const filteredJobs = useSelector(selectFilteredJobs);
  // console.log(filteredJobs, "job matched")

  useEffect(() => {
    let filteredArray = jobs
      ?.filter((job) => {
        const title = job.title.toLowerCase().includes(text.toLowerCase());

        const company = job.company_name
          .toLowerCase()
          .includes(text.toLowerCase());

        return title || company;
      })
      .filter((job, index, arr) => {
        return index === arr.findIndex((fj) => fj.title === job.title);
      });

    // console.log(filteredArray, "filteed jobs");
    setFilteredData(filteredArray);
  }, [text]);

  // if(text.trim() === '') {
  //    setShowSuggestion(false)
  //    return
  // }

  useEffect(() => {
    if (text.trim() === "") setShowSuggestion(false);
    else setShowSuggestion(true);
  }, [text]);

  return (
    <div className="flex items-center justify-between h-[80px] px-[185px] w-full mx-auto shadow-md shadow-black/30 fixed top-0 left-0 text-black  bg-[#ffffff] z-[9999]">
      {isProfileOpen ? (
        <>
          <Overlay setIsProfileOpen={setIsProfileOpen} />
          <ProfileCompo setIsProfileOpen={setIsProfileOpen} />
        </>
      ) : null}

      <div className="flex gap-4  items-center ">
        <Link to="/" className="flex items-center">
          
          <div className="text-2xl font-bold text-green-800">jobSpot</div>
        </Link>

        <div className="group ">
          <Link to="/jobs" className="border-1 rounded-sm px-4 py-1.5 ">
            Jobs
          </Link>
          {/* <div className="job-hover absolute top-[40px] text-black hidden group-hover:block">
            <p>Recommended jobs</p>
            <p>invites</p>
            <p>Application Status</p>
            <p>saved Jobs</p>
          </div> */}
        </div>

        <div className="group">
          <Link to="/companies" className="border-1 rounded-sm px-4 py-1.5">
            Companies
          </Link>
          {/* <div className="job-hover absolute top-[40px] text-black hidden group-hover:block">
            <p>Recommended jobs</p>
            <p>invites</p>
            <p>Application Status</p>
            <p>saved Jobs</p>
          </div> */}
        </div>
      </div>

      
        <div className="flex border-1 rounded-sm items-center px-3 py-1.5">
          <input
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setShowSuggestion(true);
            }}
            type="text"
            placeholder="search jobs"
            className="outline-none  rounded-sm "
          />
          <CiSearch className="text-[#117a5b]" />
        </div>

        

        <div className="absolute top-[80px] left-[600px] w-[450px] flex flex-col gap-2 bg-white border border-gray-200 rounded-lg shadow-lg  z-50">
          {
            
            showSuggestion &&
             
            
            (filteredData?.length > 0 ? (


              filteredData?.slice(0, 8)?.map((j) => (
                <Link
                onClick={()=> {
                    setText('')
                    setShowSuggestion(false)
                  }
                }
                to={`/jobs/${encodeURIComponent(j.category)}/applyto/${encodeURIComponent(j.id)}`} 
                className="flex flex-col  text-left text-gray-700 px-3  rounded-md hover:bg-green-50 hover:text-green-600 transition-all">

                  <p className="py-2 ">{j.title }</p>
                </Link>
              ))
            ) : (
              
              <p>no search found</p>
              
            ))}
        </div>
      

      <div className="links flex gap-4 items-center">
        {JSON.parse(localStorage.getItem("user")) ? (
          <div>logged in</div>
        ) : (
          <div className="flex gap-4">
            <Link
              to="/login"
              className="border-1 rounded-sm px-4 py-1.5 border-[#117a5b]"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="border-1 rounded-sm px-4 py-1.5 border-green-800 text-white bg-orange-600"
            >
              Register
            </Link>
          </div>
        )}

        <RxHamburgerMenu
          className="text-[#117a5b] text-2xl"
          onClick={() => setIsProfileOpen(true)}
        />
      </div>
    </div>
  );
};

export default UserNavbar;
