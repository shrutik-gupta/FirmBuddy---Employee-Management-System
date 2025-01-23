import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { columns, LeaveButtons } from '../../utils/LeaveHelper'
import axios from 'axios'

const AdminLeaveList = () => {
    const [leaves, setLeaves] = useState(null)
    const [filteredLeaves, setFilteredLeaves] = useState(null)

    const fetchLeaves = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/leave', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                console.log(response.data)
                let sno = 1;
                const data = await response.data.leaves.map((leave) => (
                    {
                        _id: leave._id,
                        sno: sno++,
                        emp_id: leave.emp_id.emp_id,
                        name: leave.emp_id.user_id.name,
                        leave_type: leave.leave_type,
                        dep_name: leave.emp_id.emp_dept.dep_name,
                        reason: leave.leave_reason,
                        days: (new Date(leave.leave_end_date) - new Date(leave.leave_start_date)) / (1000 * 60 * 60 * 24),
                        leave_status: leave.leave_status,
                        action: (<LeaveButtons Id={leave._id} />)
                    }
                ))
                setLeaves(data)
                setFilteredLeaves(data)

            }
        }
        catch (err) {
            if (err.response && !err.response.data.success) {
                alert(err.response.data.error);
            }
        }
    }
    useEffect(() => {
        fetchLeaves()
    }, [])

    const filterLeaves = (query) => {
        const filteredRecords = leaves.filter((leave) =>
            leave.emp_id.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredLeaves(filteredRecords);
    };

    const filterByButton = (status) => {
        const filteredRecords = leaves.filter((leave) => leave.leave_status === status);
        setFilteredLeaves(filteredRecords);
    };

    return (
        <> {filteredLeaves ? (
            <div className='p-6'>
                <div className="text-center">
                    <h3 className='text-2xl font-bold'>Manage Leaves</h3>
                </div>
                <div className="flex justify-between items-center">
                    <input onChange={(e) => filterLeaves(e.target.value)} type="text" placeholder='Search leaves by Emp Id' className='px-4 py-0.5 border' />
                    <div className='space-x-3'>
                        <button onClick={() => filterByButton('Pending')} className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'>Pending</button>
                        <button onClick={() => filterByButton('Approved')} className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'>Approved</button>
                        <button onClick={() => filterByButton('Rejected')} className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'>Rejected</button>
                    </div>
                </div>
                <div className="mt-5">
                    <DataTable columns={columns} data={filteredLeaves} pagination></DataTable>
                </div>
            </div>
        ) : <div>Loading...</div>}
        </>
    )
}

export default AdminLeaveList
