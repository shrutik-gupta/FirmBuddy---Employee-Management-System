import React, { useState } from 'react'
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddLeave = () => {
    const { user } = useAuth()
    const [leave, setLeave] = useState({
        user_id: user._id,

    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setLeave((prevState) => ({ ...prevState, [name]: value }))
    };
    const navigate = useNavigate()  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/api/leave/add`, leave,{
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                navigate(`/employee-dashboard/leaves/${user._id}`)
            }
        }
        catch (err) {
            if (err.response && !err.response.data.success) {
                alert(err.response.data.error);
            }
        }
    }

    return (
        <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-6'>Request for Leave</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Leave Type
                        </label>
                        <select
                            name="leave_type"
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Select Leave type</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Casual Leave">Casual Leave</option>
                            <option value="Casual Leave">Annual Leave</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* from date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                From Date
                            </label>
                            <input
                                type="date"
                                name="leave_start_date"
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        {/* to date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                To Date
                            </label>
                            <input
                                type="date"
                                name="leave_end_date"
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Description</label>
                        <textarea name="leave_reason" placeholder='Reason' onChange={handleChange} className='w-full border border-gray-700'></textarea>
                    </div>
                </div>
                <button type='submit' className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>Submit</button>
            </form>
        </div>
    )
}

export default AddLeave
