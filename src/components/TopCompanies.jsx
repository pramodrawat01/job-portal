import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../store/jobsSlice';

const TopCompanies = () => {

    const carouselRef = useRef(null);
    
    const {jobs} =  useSelector(state => state.jobs)

    const scrollLeft = ()=> {
        carouselRef.current.scrollBy({
            left : -carouselRef.current.offsetWidth,
            behavior : "smooth",
        })
    }

    const scrollRight = ()=>{
        carouselRef.current.scrollBy({
            left : carouselRef.current.offsetWidth,
            behavior : "smooth",
        })
    }




    // useEffect(()=>{
    //     if(jobs) console.log("job in top companies", jobs)
    // }, [])


    const companyCount = {}
    jobs.forEach(job => {
        const company = job.company_name
        if(company){
            companyCount[company] = (companyCount[company] || 0) + 1;
        }
    });


    

    const sortedCompanies = Object.entries(companyCount)
        .sort((a,b) => b[1]-a[1])
        .slice(0,5)
    
        console.log(sortedCompanies, "sorted companies")
    
    const topCompanies = sortedCompanies.map(([name]) => {
        return jobs.find(job => job.company_name === name)
    })

    // console.log(topCompanies, "top companies")


    return (
        <div className='bg-[#fff] shadow-md shadow-black/20 mt-6 p-3 h-[300px] rounded-2xl max-w-full relative '>

            <div className='text-2xl font-semibold'>Top companies</div>

            {/* carousel container */}
            <div
            ref={carouselRef} 
            className='no-scrollbar flex gap-2 overflow-x-scroll scroll-smooth  snap-x snap-mandatory no-scrollbar mt-8  h-[160px] '
            >
            {
                topCompanies?.map( company => {

                    const found = sortedCompanies.find( ([name]) => name === company.company_name );

                    return <div 
                    key={company.id}
                    className='shadow-md shadow-black/30 h-[150px] w-[200px] rounded-2xl flex-shrink-0 flex flex-col items-center'>

                        <img src={company.company_logo} alt='logo' className='border-1 p-2 rounded-xl mt-1'/>
                        <p className='text-lg font-semibold'> {company.company_name}</p>
                       
                       <p>job count : {found[1] || 0}</p>
                       <div className='flex justify-center flex-wrap gap-x-2 text-blue-500'>
                            {
                                company?.tags.slice(0, 4).map((tag, index) => (
                                    <div key={index}><u>#{tag}</u></div>
                                ))
                            }
                       </div>
                       
                    </div>
            })
            }

                
               
                {/* Left & Right Buttons */}
                <button
                    onClick={scrollLeft}
                    className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white border border-gray-300 p-2 rounded-full shadow-sm hover:bg-gray-50 z-20"
                >
                    <FiChevronLeft />
                </button>
                <button
                    onClick={scrollRight}
                    className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white border border-gray-300 p-2 rounded-full shadow-sm hover:bg-gray-50 z-20"
                >
                    <FiChevronRight />
                </button>              
                        
            </div>

        </div>

    )
}

export default TopCompanies