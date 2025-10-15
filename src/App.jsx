
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
    <>

      {
        isLoggedIn ? 
        <UserNavbar/>
        : 
        <Navbar />
      }


      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>}/>
      </Routes>
      

      

      {/* <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>}   />
        <Route path='/jobs' element={<Jobs/>}   />
        <Route path='/companies' element={<Companies/>}   />

      </Routes> */}
    </>
  )
}

export default App
