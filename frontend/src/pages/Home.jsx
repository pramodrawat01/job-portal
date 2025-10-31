import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {

    const isLoggedIn = useSelector(state => state.login.isLoggedIn)
    console.log(isLoggedIn, "is user logged in ?")
    return (
        <div>Home</div>
    )
}

export default Home