import React from 'react'
import { NavLink } from 'react-router-dom'
import {FaBuilding, FaCalendarAlt, FaCog, FaMoneyBillWave, FaTachometerAlt, FaUsers} from 'react-icons/fa'

const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen font-arima fixed left-0 top-0 space-y-2 w-64 text-xl">
        <div className="">
            <div className="bg-teal-600 h-12 flex gap-3 items-center justify-center">
                <img className='w-10 rounded-full' src="./src/assets/webicon.jpg" alt="Logo" />
                <h3 className='text-2xl text-center'>FirmBuddy</h3>
            </div>
            <div className="px-4">

            <NavLink to='/admin-dashboard' className= {({isActive})=> `${isActive? "bg-teal-500" : ""} flex item-center mt-6 space-x-4 py-2.5 px-4 rounded`} end>
                <FaTachometerAlt/>
                <span>Dashboard</span>
            </NavLink>
            <NavLink to='/admin-dashboard/employees' className= {({isActive})=> `${isActive? "bg-teal-500" : ""} flex item-center mt-6 space-x-4 py-2.5 px-4 rounded`} end>
                <FaUsers/>
                <span>Employees</span>
            </NavLink>
            <NavLink to='/admin-dashboard/departments' className= {({isActive})=> `${isActive? "bg-teal-500" : ""} flex item-center mt-6 space-x-4 py-2.5 px-4 rounded`} end>
                <FaBuilding/>
                <span>Departments</span>
            </NavLink>
            <NavLink to='/admin-dashboard/leaves' className= {({isActive})=> `${isActive? "bg-teal-500" : ""} flex item-center mt-6 space-x-4 py-2.5 px-4 rounded`} end>
                <FaCalendarAlt/>
                <span>Leaves</span>
            </NavLink>
            <NavLink to='/admin-dashboard/salary' className= {({isActive})=> `${isActive? "bg-teal-500" : ""} flex item-center mt-6 space-x-4 py-2.5 px-4 rounded`} end>
                <FaMoneyBillWave/>
                <span>Salary</span>
            </NavLink>
            <NavLink to='/admin-dashboard/settings' className= {({isActive})=> `${isActive? "bg-teal-500" : ""} flex item-center mt-6 space-x-4 py-2.5 px-4 rounded`} end>
                <FaCog/>
                <span>Settings</span>
            </NavLink>
            </div>
        </div>
    </div>
  )
}

export default AdminSidebar
