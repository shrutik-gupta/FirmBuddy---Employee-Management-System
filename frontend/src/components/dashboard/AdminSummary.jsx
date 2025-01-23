import React, { useEffect, useState } from 'react'
import SummaryCard from './SummaryCard'
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from 'react-icons/fa'
import axios from 'axios'

const AdminSummary = () => {
  const [summary, setSummary] = useState(null)

  const fetchSummary = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/dashboard/summary', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSummary(response.data); // Use response.data instead of just response
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || 'An error occurred');
      }
    }
  };


  useEffect(() => {
    fetchSummary()
  }, [])

  if (!summary) {
    return <div>Loading...</div>
  }

  return (
    <div className='font-arima p-6'>
      <h3 className='text-2xl font-bold'>Organization's overview</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
        <SummaryCard icon={<FaUsers />} text="Total employees" number={summary.totalEmployees} color='bg-teal-600' />
        <SummaryCard icon={<FaBuilding />} text="Total Departments" number={summary.totalDepartments} color='bg-yellow-600' />
        <SummaryCard icon={<FaMoneyBillWave />} text="Monthly Salary" number={summary.totalSalaries} color='bg-red-600' />
      </div>

      <div className='mt-12'>
        <h4 className='text-center text-2xl font-bold'>Leave Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCard icon={<FaFileAlt />} text="Employees Applied for leave" number={summary.leaveSummary.applied} color='bg-teal-600' />
          <SummaryCard icon={<FaCheckCircle />} text="Leaved Approved" number={summary.leaveSummary.approved} color='bg-green-600' />
          <SummaryCard icon={<FaHourglassHalf />} text="Leaved Pending" number={summary.leaveSummary.pending} color='bg-yellow-600' />
          <SummaryCard icon={<FaTimesCircle />} text="Leaved Rejected" number={summary.leaveSummary.rejected} color='bg-red-600' />
        </div>
      </div>
    </div>
  )
}

export default AdminSummary
