import React from 'react'
import { MdCancel } from "react-icons/md";

const ProfileCompo = ({setIsProfileOpen}) => {
  return (
    <div className='rounded-lg w-[30vw] h-[100vh] absolute top-0 right-0 bg-[#fff]'>

      <MdCancel  onClick={()=> setIsProfileOpen(false)}/>
    </div>
  )
}

export default ProfileCompo