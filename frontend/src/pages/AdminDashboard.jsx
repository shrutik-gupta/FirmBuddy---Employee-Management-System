import React from 'react'
import { useAuth } from '../context/authContext'
import Navbar from '../components/dashboard/Navbar'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import AdminSummary from '../components/dashboard/AdminSummary'
import { Outlet } from 'react-router-dom'
const AdminDashboard = () => {
  const {user} = useAuth()
  return (
    <div className='admin-dashboard-main font-arima'>
      <div className="w-1/5">
        <AdminSidebar/>
      </div>
      <div className=" flex-1 ml-64 bg-gray-100 h-screen">
        <Navbar/>
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminDashboard
