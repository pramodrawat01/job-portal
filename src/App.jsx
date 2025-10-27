
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import Jobs from './pages/Jobs'
import Companies from './pages/Companies'
import { useSelector } from 'react-redux'
import UserNavbar from './components/UserNavbar'
import { useEffect, useState } from 'react'
import UserHome from './pages/UserHome'
import Login from './pages/Login'
import ApplySectoin from './pages/ApplySection'
import Footer from './pages/Footer'
import JobsCategory from './pages/JobsCategory'

function App() {


  const isLoggedIn = useSelector(state => state.login.isLoggedIn)
  const [hideNavbar, setHideNavbar] =useState(false)

  const location = useLocation()

  
  // console.log(hideNavbar, "hidnavbar")
  useEffect(()=>{
    if(location.pathname === '/register'){
      setHideNavbar(true)
    }
    else {
       setHideNavbar(false)
    }
  }, [location.pathname])

  
  
  return (
    <div className='bg-[#F8F9FA]'>

      {
        isLoggedIn ? 
        <UserNavbar/>
        : 
        <Navbar />
      } 

      

      <div className='w-[75vw] mx-auto mt-[80px] pt-10 '>

      <Routes>
        <Route path='/' element={ isLoggedIn ? <UserHome/> :<Home/>} />
        <Route path='/register' element={<Register/>}   />

        <Route path='/jobs' element={<Jobs/>}/>
        <Route path='/jobs/:category' element={<JobsCategory/>}   />
        <Route path='/companies' element={<Companies/>}   />
        <Route path='/login' element={<Login/>} />


        <Route path='/jobs/:category/applyto/:id' element={ <ApplySectoin/>}/>
      </Routes>

      </div>

      <Footer/>
    </div>


  )
}

export default App
