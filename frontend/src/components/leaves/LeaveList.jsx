import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const LeaveList = () => {
  let sno = 1;
  const [leaves, setLeaves] = useState(null)
  const [filteredLeaves, setFilteredLeaves] = useState(null)
  const { id } = useParams()
  const { user } = useAuth()
  const fetchLeaves = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/api/leave/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        setLeaves(response.data.leaves || []);
        setFilteredLeaves(response.data.leaves || []);
    }
    catch (err) {
        console.error('Leave fetch error:', err);
        alert(err.response?.data?.message || err.message || 'Failed to fetch leaves');
        setLeaves([]);
        setFilteredLeaves([]);
    }
};
  useEffect(() => {
    fetchLeaves();
  }, [])

  const filterLeaves = (query) => {
    const filteredRecords = leaves.filter((leave) =>
      leave.leave_type.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredLeaves(filteredRecords);
  };

  return (
    <div className='p-6'>
      <div className="text-center">
        <h3 className='text-2xl font-bold'>Leaves History</h3>
      </div>
      <div className="flex justify-between items-center">
        <input type="text" placeholder='Search leaves' onChange={(e) => filterLeaves(e.target.value)} className='px-4 py-0.5 border' />
        {user.role === 'employee' && (
          <Link to='/employee-dashboard/add-leave' className='px-4 py-1 bg-teal-600 rounded text-white'>Add New Leave</Link>
        )}
      </div>
      {filteredLeaves === null ? (<div>Loading...</div>) : (
        <div className="p-5 overflow-x-auto">
          <div className="flex justify-end my-3">
          </div>
          {filteredLeaves.length > 0 ?
            (<table className='w-full text-sm text-left text-gray-500'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
                <tr>
                  <th className='px-6 py-3'>SNO</th>
                  <th className='px-6 py-3'>Leave Type</th>
                  <th className='px-6 py-3'>From</th>
                  <th className='px-6 py-3'>To</th>
                  <th className='px-6 py-3'>Description</th>
                  <th className='px-6 py-3'>Applied Date</th>
                  <th className='px-6 py-3'>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeaves.map((leave) => (
                  <tr key={leave._id} className="bg-white border-b ">
                    <td className="px-6 py-3">{sno++}</td>
                    <td className="px-6 py-3">{leave.leave_type}</td>
                    <td className="px-6 py-3">{new Date(leave.leave_start_date).toLocaleDateString()}</td>
                    <td className="px-6 py-3">{new Date(leave.leave_end_date).toLocaleDateString()}</td>
                    <td className="px-6 py-3">{leave.leave_reason}</td>
                    <td className="px-6 py-3">{new Date(leave.leave_applied_date).toLocaleDateString()}</td>
                    <td className="px-6 py-3">{leave.leave_status}</td>
                  </tr>
                ))}
              </tbody>

            </table>) : (<div>No Records found</div>)
          }
        </div>
      )}
    </div>
  )
}

export default LeaveList
