import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const LeaveDetail = () => {
    const { id } = useParams();
    const [leave, setLeave] = useState(null)
    useEffect(() => {
        const fetchLeave = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/leave/detail/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.success) {
                    setLeave(response.data.leave)
                }
            }
            catch (err) {
                if (err.response && !err.response.data.success) {
                    alert(err.response.data.error);
                }
            }
        }
        fetchLeave()
    }, [])
    const navigate = useNavigate()
    const changeStatus = async (id, leave_status) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/leave/${id}`, { leave_status: leave_status }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                navigate('/admin-dashboard/leaves')
            }
        }
        catch (err) {
            if (err.response && !err.response.data.success) {
                alert(err.response.data.error);
            }
        }
    }

    return (
        <> {leave ?
            <div className='font-arima max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
                <h2 className='text-2xl font-bold mb-8 text-center'>
                    Leave Detail
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                        <img className='h-80 w-80' src={`http://localhost:3000/${leave.emp_id.user_id.profileImage}`} alt="" />
                    </div>
                    <div>
                        <div className="flex space-x-3 mb-3">
                            <p className='text-lg font-bold'>Name: </p>
                            <p className='font-medium'>{leave.emp_id.user_id.name}</p>
                        </div>
                        <div className="flex space-x-3 mb-3">
                            <p className='text-lg font-bold'>Employee Id: </p>
                            <p className='font-medium'>{leave.emp_id.emp_id}</p>
                        </div>
                        <div className="flex space-x-3 mb-3">
                            <p className='text-lg font-bold'>Leave Type:</p>
                            <p className='font-medium'>{leave.leave_type}</p>
                        </div>
                        <div className="flex space-x-3 mb-3">
                            <p className='text-lg font-bold'>Reason: </p>
                            <p className='font-medium'>{leave.leave_reason}</p>
                        </div>
                        <div className="flex space-x-3 mb-3">
                            <p className='text-lg font-bold'>Department: </p>
                            <p className='font-medium'>{leave.emp_id.emp_dept.dep_name}</p>
                        </div>
                        <div className="flex space-x-3 mb-3">
                            <p className='text-lg font-bold'>Start Date: </p>
                            <p className='font-medium'>{new Date(leave.leave_start_date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex space-x-3 mb-3">
                            <p className='text-lg font-bold'>End Date: </p>
                            <p className='font-medium'>{new Date(leave.leave_end_date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex space-x-3 mb-3">
                            <p className='text-lg font-bold'>
                                {leave.leave_status === 'Pending' ? 'Action:' : 'Stauts:'}
                            </p>
                            {leave.leave_status === 'Pending' ?
                                (
                                    <div className='flex space-x-2'>
                                        <button
                                            onClick={() => changeStatus(leave._id, 'Approved')}
                                            className='px-2 py-0.5 bg-teal-400 hover:bg-teal-600 rounded'>
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => changeStatus(leave._id, 'Rejected')}
                                            className='px-2 py-0.5 bg-red-400 hover:bg-red-600 rounded'>
                                            Reject
                                        </button>

                                    </div>
                                )
                                :
                                (
                                    <p className='font-medium'>{leave.leave_status}</p>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
            : <div>Loading...</div>}
        </>
    )
}

export default LeaveDetail
