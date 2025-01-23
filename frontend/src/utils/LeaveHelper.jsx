import React from 'react'
import { useNavigate } from 'react-router-dom'

export const columns = [
    {
        name: 'Serial',
        selector: (row) => row.sno,
        width: '70px'
    },
    {
        name: 'Emp Id',
        selector: (row) => row.emp_id,
        width: '120px'
    },
    {
        name: 'Name',
        selector: (row) => row.name,
        sortable: true,
        width: '120px',
    },
    {
        name: 'Department',
        selector: (row) => row.dep_name,
        width: '140px'
    },
    {
        name: 'Leave Type',
        selector: (row) => row.leave_type,
        width: '140px',
        
    },
    {
        name: 'Description',
        selector: (row) => row.reason,
        width: '280px'
    },
    {
        name: 'Days',
        selector: (row) => row.days,
        sortable: true,
        width: '80px'
    },
    {
        name: 'Status',
        selector: (row) => row.leave_status,
        width: '120px'
    },
    {
        name: 'Action',
        selector: (row) => row.action
    }
  ]

export const LeaveButtons = ({Id})=>{
    const navigate = useNavigate()

    const handleView = (id)=>{
        navigate(`/admin-dashboard/leaves/${Id}`)
    }

    return(
        <button onClick={handleView} className='px-4 py-1 bg-teal-500 rounded text-white hover:bg-teal-600'>
            View
        </button>
    )
}
