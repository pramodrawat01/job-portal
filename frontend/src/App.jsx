
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
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
import AppliedHistory from './pages/AppliedHistory'
import ProtectedRoute from './components/ProtectedRoute'
import SavedJobs from './pages/SavedJobs'
import CompleteProfile from './pages/createProfile/CompleteProfile'
import Step1 from './pages/createProfile/Step1'
import Step2 from './pages/createProfile/Step2'

function App() {


  const isLoggedIn = useSelector(state => state.login.isLoggedIn)
  const [hideNavbar, setHideNavbar] =useState(false)

  const loggedUser = JSON.parse(localStorage?.getItem('user')) || null
  
  // console.log(loggedUser, "logged user in app")
  const location = useLocation()
  
  // console.log(hideNavbar, "hidnavbar")
  useEffect(()=>{
    if(location.pathname === '/register' || location.pathname === '/login' || location.pathname === ''){
      setHideNavbar(true)
    }
    else {
       setHideNavbar(false)
    }
  }, [location.pathname])

  const step1Marked = false
  const step2Marked = false

  
  
  return (
    <div className='bg-[#F8F9FA]'>

      {/* {
        isLoggedIn ? 
        <UserNavbar/>
        : 
        <Navbar />
      }  */}

      {/* {
        userLoggedIn ? 
        <UserNavbar/>
        : 
        <Navbar />
      }  */}

        {
          hideNavbar ?
          <Navbar/>
          :
          <UserNavbar/>
        }
      

      

      <div >

      <Routes>
        
        <Route 
          path='/' 
          element={ 
            loggedUser 
            ? 
            <Navigate to='/userHome' replace/>
            :
            <Navigate to='/home' replace/>
          } 
        />


        <Route path='/home' element={<Home/>} />
        <Route
          path='/userHome'
          element={
            <ProtectedRoute>
              <UserHome/>
            </ProtectedRoute>
          }
        />

        <Route path='/register' element={<Register/>}   />

        <Route path='/jobs' element={<Jobs/>}/>
        <Route path='/jobs/:category' element={<JobsCategory/>}   />
        <Route path='/companies' element={<Companies/>}   />
        <Route path='/login' element={<Login/>} />



        <Route path='/jobs/:category/applyto/:id' element={ 
          <ProtectedRoute>
            <ApplySectoin/>
          </ProtectedRoute>
        }/>

        <Route path='/appliedHistory' element={<AppliedHistory/>}/>
        
        <Route path='/savedJobs' element={
          <ProtectedRoute>
            <SavedJobs/>
          </ProtectedRoute>
        }/>

        <Route path='/user/completeProfile' element={
          <ProtectedRoute>

          {
            step1Marked 
              ? (step2Marked ? <Step2 /> : <CompleteProfile />)
              : <Step1 />
          }


          </ProtectedRoute>
        }/>
      </Routes>

      </div>

      <Footer/>
    </div>


  )
}

export default App



// step1Marked and step2Marked ko user m save krana h while signing up so we can track his profile complitation