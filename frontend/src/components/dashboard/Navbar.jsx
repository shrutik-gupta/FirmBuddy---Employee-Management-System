import React from 'react'
import { useAuth } from '../../context/authContext'

const Navbar = () => {
    const {user, logout} = useAuth()
  return (
    <div className='navbar font-arima text-2xl left-1/4 flex items-center justify-between text-white bg-teal-600 h-12'>
        <div className="navbar-left flex justify-center items-center gap-20">
          <p>Welcome, {user ? user.name : "back"}</p>
        </div>
        <div className="navbar-right">
          <button 
              type='submit'
              className="text-lg mr-4 px-4 py-1 bg-white text-black rounded-full hover:text-white hover:bg-teal-900 focus:outline-none focus:ring-2 "
              onClick={()=>logout()}
          >
              Logout
          </button>
        </div>
    </div>
  )
}

export default Navbar
