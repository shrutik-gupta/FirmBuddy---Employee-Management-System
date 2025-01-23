import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelper'
import { fetchEmployees } from '../../utils/EmployeeHelper'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const AddSalary = () => {
    const navigate = useNavigate();
    const [salary, setSalary] = useState({
        emp_id: null,
        emp_basic_salary: 0,
        emp_allowances: 0,
        emp_deductions: 0,
        emp_pay_date: null
    })
    const [departments, setDepartments] = useState(null)
    const [employees, setEmployees] = useState([])
    const { id } = useParams()

    useEffect(() => {
        const getDepartments = async () => {
            const depts = await fetchDepartments()
            setDepartments(depts)
        }
        getDepartments()

    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalary(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/api/salary/add`, salary, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                navigate('/admin-dashboard/employees')
            }
        }
        catch (err) {
            if (err.response && !err.response.data.success) {
                alert(err.response.data.error);
            }
        }
    }

    const handleDepartment = async(e) => {
        const emps = await fetchEmployees(e.target.value)
        setEmployees(emps);
    }

    return (
        <>{departments ?
            <div className='max-w-4xl mx-auto mt-10 bg-white font-arima p-8 rounded-md shadow-md'>
                <h2 className="text-2xl font-bold mb-6">
                    Edit Employee
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* department */}
                        <div >
                            <label htmlFor="emp_dept" className='block text-sm font-medium text-gray-700'>Select Department</label>
                            <select
                                value={employees.emp_dept}
                                onChange={handleDepartment}
                                name="emp_dept"
                                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                required
                            >
                                <option value="">Select Department</option>
                                {departments.map(dept => (
                                    <option key={dept._id} value={dept._id}>{dept.dep_name}</option>
                                ))}
                            </select>
                        </div>
                        {/* employees */}
                        <div >
                            <label htmlFor="emp_id" className='block text-sm font-medium text-gray-700'>Select Employee</label>
                            <select
                                onChange={handleChange}
                                name="emp_id"
                                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                required
                            >
                                <option value="">Select Employee</option>
                                {employees.map(emp => (
                                    <option key={emp._id} value={emp._id}>{emp.user_id.name}</option>
                                ))}
                            </select>
                        </div>
                        {/* Basic salary */}
                        <div>
                            <label htmlFor="emp_basic_salary" className='block text-sm font-medium text-gray-700'>Basic Salary</label>
                            <input
                                onChange={handleChange}
                                type="number"
                                name="emp_basic_salary"
                                placeholder='Add Employee Basic Salary'
                                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                required
                            />
                        </div>
                        {/* Allowance */}
                        <div>
                            <label htmlFor="emp_allowances" className='block text-sm font-medium text-gray-700'>Allowance</label>
                            <input
                                onChange={handleChange}
                                type="number"
                                name="emp_allowances"
                                placeholder='Add Employee Allowance'
                                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                required
                            />
                        </div>
                        {/* Deducations */}
                        <div>
                            <label htmlFor="emp_deductions" className='block text-sm font-medium text-gray-700'>Deducations</label>
                            <input
                                onChange={handleChange}
                                type="number"
                                name="emp_deductions"
                                placeholder='Add Employee Deductions'
                                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                required
                            />
                        </div>
                        {/* Pay date */}
                        <div>
                            <label htmlFor="emp_pay_date" className='block text-sm font-medium text-gray-700'>Pay Date</label>
                            <input
                                onChange={handleChange}
                                type="date"
                                name="emp_pay_date"
                                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                required
                            />
                        </div>
                    </div>
                    <button type='submit' className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>Submit</button>
                </form>
            </div>
            : <div>Loading...</div>}
        </>
    )
}

export default AddSalary