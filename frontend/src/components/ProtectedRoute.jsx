import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthUser } from '../hooks/useAuthUser'
import { toast } from 'react-toastify'

const ProtectedRoute = ({children}) => {

    const user = JSON.parse(localStorage.getItem('user'))
   
    console.log("inside protected route", user)

    
    if(user){
        return children;
    }

    

    return <Navigate to='/login' replace />
}

export default ProtectedRoute