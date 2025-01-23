import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useAuth } from '../../context/authContext'
const EmpSummary = () => {
    const { user } = useAuth()

    return (
        <div className='rounded flex m-4 bg-white'>
            <div className={`text-3xl flex justify-center items-center bg-teal-600 text-white px-4`}>
                <FaUser />
            </div>
            <div className="pl-4 py-1">
                <p className='text-lg font-semibold'>Hello {user.name}</p>
                <p className='text-base '>This is your personal workspace</p>
            </div>
        </div>
    )
}

export default EmpSummary
