import React from 'react'
import { Link } from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  return (
    <div className='flex items-center justify-between h-[80px] px-[185px] w-full mx-auto shadow-md shadow-black/30 fixed top-0 left-0 text-black  bg-[#ffffff] z-[9999]'>
        <div className='flex gap-2 items-center text-xl'>
            <Link to='/'>jobspot.com</Link>
            
        </div>

        <div className='links flex items-center gap-4' >
            <Link to='/login' className='border-1 rounded-sm px-4 py-1.5'>Login</Link>
            <Link to='/register' className='border-1 rounded-sm px-4 py-1.5' >Register</Link>
            <Link to=''></Link>
            
        </div>
    </div>
  )
}

export default Navbar