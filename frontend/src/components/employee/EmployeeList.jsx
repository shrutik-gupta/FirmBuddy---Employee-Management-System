import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper'
import axios from 'axios'

const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    const [empLoading, setEmpLoading] = useState(false)
    const [filterdEmployees, setfilterdEmployees] = useState([])

    const fetchEmployees = async () => {
        setEmpLoading(true)
        try {
            const response = await axios.get('http://localhost:3000/api/employees', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                let sno = 1;
                const data = await response.data.employees.map((emp) => (
                    {
                        _id: emp._id, //from db
                        sno: sno++, //we made
                        dep_name: emp.emp_dept.dep_name, //from db
                        name: emp.user_id.name,
                        dob: new Date(emp.emp_dob).toLocaleDateString(),
                        profileImage: <img className='w-10 h-10 rounded-full' src={`http://localhost:3000/${emp.user_id.profileImage}`}/>,
                        action: (<EmployeeButtons Id={emp._id}/>) //we made
                    }
                ))
                setEmployees(data)
                setfilterdEmployees(data)
            }
        }
        catch (err) {
            if (err.response && !err.response.data.success) {
                alert(err.response.data.error);
            }
        }
        finally {
            setEmpLoading(false)
        }
    }

    const onEmpDelete = async (id) => {
        const data = employees.filter(dep => dep._id !== id)
        setEmployees(data)
        setfilterdEmployees(data)
        fetchEmployees() //update the list after deleting a department
    }

    useEffect(() => {
        fetchEmployees()
    }, [])

    const filterEmployees = (e) => {
        const records = employees.filter(
            (emp) =>
                emp.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
        setfilterdEmployees
        (records)
    }

    return (
        <div className='font-arima p-5 '>
            <div className='text-center'>
                <h3 className='text-2xl font-bold'>Manage Employees</h3>
            </div>
            <div className='flex justify-between items-center'>
                <input onChange={filterEmployees} type="text" placeholder='Search Employees' className='px-4 py-0.5 border' />
                <Link to='/admin-dashboard/add-employee' className='px-4 py-1 bg-teal-600 rounded text-white'>Add New Employee</Link>
            </div>
            <div className='mt-5'>
                <DataTable columns={columns} data={filterdEmployees} pagination/>
            </div>
        </div>

    )
}

export default EmployeeList
