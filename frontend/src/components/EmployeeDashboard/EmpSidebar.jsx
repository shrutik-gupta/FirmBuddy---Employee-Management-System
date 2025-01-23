import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaBuilding, FaCalendarAlt, FaCog, FaMoneyBillWave, FaTachometerAlt, FaUsers } from 'react-icons/fa'
import { useAuth } from '../../context/authContext'

const EmpSidebar = () => {
    const {user} = useAuth()
    return (
        <div className="bg-gray-800 text-white h-screen font-arima fixed left-0 top-0 space-y-2 w-64 text-xl">
            <div className="">
                <div className="bg-teal-600 h-12 flex items-center justify-center">
                    <h3 className='text-2xl text-center'>FirmBuddy</h3>
                </div>
                <div className="px-4">

                    <NavLink to='/employee-dashboard' className={({ isActive }) => `${isActive ? "bg-teal-500" : ""} flex item-center mt-6 space-x-4 py-2.5 px-4 rounded`} end>
                        <FaTachometerAlt />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to={`/employee-dashboard/profile/${user._id}`} className={({ isActive }) => `${isActive ? "bg-teal-500" : ""} flex item-center mt-6 space-x-4 py-2.5 px-4 rounded`} end>
                        <FaUsers />
                        <span>My Profile</span>
                    </NavLink>
                    <NavLink to={`/employee-dashboard/leaves/${user._id}`} className={({ isActive }) => `${isActive ? "bg-teal-500" : ""} flex item-center mt-6 space-x-4 py-2.5 px-4 rounded`} end>
                        <FaBuilding />
                        <span>Leaves</span>
                    </NavLink>
                    <NavLink to={`/employee-dashboard/salary/${user._id}`} className={({ isActive }) => `${isActive ? "bg-teal-500" : ""} flex item-center mt-6 space-x-4 py-2.5 px-4 rounded`} end>
                        <FaCalendarAlt />
                        <span>Salary</span>
                    </NavLink>
                    <NavLink to='/employee-dashboard/settings' className={({ isActive }) => `${isActive ? "bg-teal-500" : ""} flex item-center mt-6 space-x-4 py-2.5 px-4 rounded`} end>
                        <FaMoneyBillWave />
                        <span>Settings</span>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default EmpSidebar
