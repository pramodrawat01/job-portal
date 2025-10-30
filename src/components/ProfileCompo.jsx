import React from 'react'
import { MdCancel } from "react-icons/md";
import { Link } from 'react-router-dom';

const ProfileCompo = ({setIsProfileOpen}) => {
  return (
    <div className='rounded-lg w-[30vw] h-[100vh] absolute top-0 right-0 bg-[#fff]'>

      <MdCancel  onClick={()=> setIsProfileOpen(false)}/>

      <Link to='/appliedHistory' >application History</Link>
    </div>
  )
}

export default ProfileCompo