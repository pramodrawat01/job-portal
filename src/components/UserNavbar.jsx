import React from 'react'
import { Link } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { userSearch } from '../store/searchSlice';
import { RxHamburgerMenu } from "react-icons/rx";

const UserNavbar = () => {

   

  const dispatch = useDispatch()
  const {searchValue} = useSelector(state => state.search)
  console.log(searchValue, "this is store value")
  return (
    <div className='flex justify-around py-2 bg-[#2f2f2f] text-white'>
        <div className='flex gap-2'>
            <Link to='/'>naukar.com</Link>


            <div className='group'> 
              <Link to='/jobs' className='border-1 rounded-sm px-4' >Jobs</Link>
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

        <div className='flex border-1 rounded-sm items-center px-3'>
          <input 
          onChange={(e)=> dispatch(userSearch(e.target.value))}
          type='text' placeholder='search jobs' className='outline-none  rounded-sm ' />
          <CiSearch  className=''/>
        </div>

        <div className='links flex gap-4 items-center' >
            <Link to='/login' className='border-1 rounded-sm px-4'>Login</Link>
            <Link to='/register' className='border-1 rounded-sm px-4' >Register</Link>
            <Link to=''></Link>
            <RxHamburgerMenu className='text-white' />
        </div>
    </div>

  )
}

export default UserNavbar