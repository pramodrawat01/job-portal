import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-around py-2 bg-[#2f2f2f] text-white'>
        <div className='flex gap-2'>
            <Link to='/'>naukar.com</Link>
            <Link to='/jobs' className='border-1 rounded-sm px-4' >Jobs</Link>
            <Link to='/companies' className='border-1 rounded-sm px-4'>Companies</Link>
            
        </div>

        <div className='links flex gap-4' >
            <Link to='/login' className='border-1 rounded-sm px-4'>Login</Link>
            <Link to='/register' className='border-1 rounded-sm px-4' >Register</Link>
            <Link to=''></Link>
        </div>
    </div>
  )
}

export default Navbar