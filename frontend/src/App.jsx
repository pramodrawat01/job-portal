
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
import Step3 from './pages/createProfile/Step3'

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

  const {step1Completed, step2Completed, step3Completed } = useSelector(state => state.signup.user)

  console.log(step1Completed, step2Completed, step3Completed, "these are steps")

  // let step1Marked = false
  // /// these steps will be tacked in user's profile 
  // if(JSON.parse(localStorage.getItem('user'))){
  //   const user = JSON.parse(localStorage.getItem('user'))
  //   step1Marked : user.step1Completed

  // }
  
  // const step2Marked = false
  // const step3Marked = false;

  
  
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
          // <ProtectedRoute>

          // {
            step1Completed || JSON.parse(localStorage.getItem('step1Completed')) 
              ? (step2Completed ? 
                ( step3Completed ? <CompleteProfile/> : <Step3/> ) 
                
                : <Step2/>)

              : <Step1 />                                           
          // }


          // </ProtectedRoute>
        }/>
      </Routes>

      </div>

      <Footer/>
    </div>


  )
}

export default App



// step1Marked and step2Marked ko user m save krana h while signing up so we can track his profile complitation

/***
 * 
 * agar signedUpUser h to step1 par jaye ---> verify mobile number hai 
 * once done this mark step1Marked : ture
 * 
 * then move to step2 to fill the educational details 
 * once done this step mark step2Marked : ture
 * 
 * then move to complete prorile to fill the final details like resume upload + add headline and preferences
 * 
 * and protected route ko backend se verify krenge completeProfile : true or false se 
 * 
 * 
 * protected route m token check krenge from local storage and
 * 
 * step 1 ko otp verify krne ke bad true karna hai 
 * 
 * now one thing to do is change reister button  to complete profile  in navbar
 * and then navigate to otp verify page
 */