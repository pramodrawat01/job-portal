import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { userSearch } from '../store/searchSlice';
import { RxHamburgerMenu } from "react-icons/rx";
import Overlay from './Overlay';
import ProfileCompo from './ProfileCompo';
import logo from '../assets/logo1.png'

const UserNavbar = () => {

   const [isProfileOpen, setIsProfileOpen] = useState(false)

  const dispatch = useDispatch()
  const {searchValue} = useSelector(state => state.search)
  console.log(searchValue, "this is store value")



  return (
    <div className='flex items-center justify-between h-[80px] px-[185px] w-full mx-auto shadow-md shadow-black/30 fixed top-0 left-0  bg-white z-[9999]'>

      {
        isProfileOpen ? 
        (<>
          <Overlay/>
          <ProfileCompo setIsProfileOpen={setIsProfileOpen}/>
        </>) :
        null
      }

          <div className='flex gap-4  items-center '>
            
            <Link to='/' className='flex items-center'>
              <img src={logo} className='h-[70px]'/>
              <div className='text-2xl font-semibold text-[#117a5b]'>jobSpot</div>
            </Link>


            <div className='group'> 
              <Link to='/jobs' className='border-1 rounded-sm px-4 ' >Jobs</Link>
              <div className='job-hover absolute top-[40px] text-black hidden group-hover:block'>
                <p>Recommended jobs</p>
                <p>invites</p>
                <p>Application Status</p>
                <p>saved Jobs</p>
              </div>
            </div>
            
            <div className='group'>
              <Link to='/companies' className='border-1 rounded-sm px-4'>Companies</Link>
              <div className='job-hover absolute top-[40px] text-black hidden group-hover:block'>
                <p>Recommended jobs</p>
                <p>invites</p>
                <p>Application Status</p>
                <p>saved Jobs</p>
              </div>
            </div>
           
            
        </div>

        <div className='flex border-1 rounded-sm items-center px-3 py-1.5'>
          <input 
          onChange={(e)=> dispatch(userSearch(e.target.value))}
          type='text' placeholder='search jobs' className='outline-none  rounded-sm ' />
          <CiSearch  className='text-[#117a5b]'/>
        </div>

        <div className='links flex gap-4 items-center' >
            <Link to='/login' className='border-1 rounded-sm px-4 py-1.5 border-[#117a5b]'>Login</Link>
            <Link to='/register' className='border-1 rounded-sm px-4 py-1.5 text-white bg-[#117a5b]' >Register</Link>
           
            <RxHamburgerMenu className='text-[#117a5b] text-2xl' onClick={()=> setIsProfileOpen(true)} />
        </div>
    </div>

  )
}

export default UserNavbar