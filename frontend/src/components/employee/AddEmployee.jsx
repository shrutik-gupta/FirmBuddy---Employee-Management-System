import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelper'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const AddEmployee = () => {
    const navigate = useNavigate(); 
    const [departments, setDepartments] = useState([])
    useEffect(() => {
        const getDepartments = async () => {
            const depts = await fetchDepartments()
            setDepartments(depts)
        }
        getDepartments()
    }, [])

    const [formData, setFormData] = useState({})

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "emp_image") {
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }))
        }
        else {
            setFormData((prevData) => ({ ...prevData, [name]: value }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataObj = new FormData(); //because formData contains file, hence, use object to parse files
        Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key])
        })
        try {
            const response = await axios.post('http://localhost:3000/api/employees/add', formDataObj, {
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

    return (
        <div className='max-w-4xl mx-auto mt-10 bg-white font-arima p-8 rounded-md shadow-md'>
            <h2 className="text-2xl font-bold mb-6">
                Add New Employee
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="emp_name" className='block text-sm font-medium text-gray-700'>Name</label>
                        <input onChange={handleChange} type="text" name="emp_name" placeholder='Add Employee Name' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                    </div>
                    <div>
                        <label htmlFor="emp_email" className='block text-sm font-medium text-gray-700'>Email</label>
                        <input onChange={handleChange} type="email" name="emp_email" placeholder='Add Employee Email' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                    </div>
                    <div>
                        <label htmlFor="emp_id" className='block text-sm font-medium text-gray-700'>Employee Id</label>
                        <input onChange={handleChange} type="text" name="emp_id" placeholder='Add Employee Id' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                    </div>
                    <div>
                        <label htmlFor="emp_dob" className='block text-sm font-medium text-gray-700'>Date of Birth</label>
                        <input onChange={handleChange} type="date" name="emp_dob" placeholder='Add Employee DOB' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                    </div>
                    <div>
                        <label htmlFor="emp_gender" className='block text-sm font-medium text-gray-700'>Employee Gender</label>
                        <select onChange={handleChange} name="emp_gender" className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="emp_marital_status" className='block text-sm font-medium text-gray-700'>Employee Marital Status</label>
                        <select onChange={handleChange} name="emp_marital_status" className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                            <option value="">Select Marital Status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="emp_designation" className='block text-sm font-medium text-gray-700'>Employee Designation</label>
                        <input onChange={handleChange} type="text" name="emp_designation" placeholder='Add Employee Designation' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                    </div>
                    <div>
                        <label htmlFor="emp_dept" className='block text-sm font-medium text-gray-700'>Employee Department</label>
                        <select onChange={handleChange} name="emp_dept" className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                            <option value="">Select Department</option>
                            {departments.map(dept => (
                                <option key={dept._id} value={dept._id}>{dept.dep_name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="emp_salary" className='block text-sm font-medium text-gray-700'>Employee Salary</label>
                        <input onChange={handleChange} type="number" name="emp_salary" placeholder='Add Employee Salary' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                    </div>
                    <div>
                        <label htmlFor="emp_password" className='block text-sm font-medium text-gray-700'>Employee Password</label>
                        <input onChange={handleChange} type="password" name="emp_password" placeholder='Add Employee Password' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                    </div>
                    <div>
                        <label htmlFor="emp_role" className='block text-sm font-medium text-gray-700'>Employee Role</label>
                        <select onChange={handleChange} name="emp_role" className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="emp_image" className='block text-sm font-medium text-gray-700'>Employee Image</label>
                        <input onChange={handleChange} type="file" accept='image/*' name="emp_image" placeholder='Upload Employee Image' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                    </div>
                </div>
                <button type='submit' className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>Submit</button>
            </form>
        </div>
    )
}

export default AddEmployee
