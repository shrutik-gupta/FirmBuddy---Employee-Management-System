import React from 'react'
import Navbar from '../components/dashboard/Navbar'
import EmpSidebar from '../components/EmployeeDashboard/EmpSidebar'
import { Outlet } from 'react-router-dom'

const EmployeeDashboard = () => {
  return (
    <div className='admin-dashboard-main font-arima'>
      <div className="w-1/5">
        <EmpSidebar />
      </div>
      <div className=" flex-1 ml-64 bg-gray-100 h-screen">
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default EmployeeDashboard
