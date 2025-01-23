import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelper'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmployees = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    emp_name: '',
    emp_marital_status: '',
    emp_designation: '',
    emp_salary: 0,
    emp_dept: ''
  })
  const [departments, setDepartments] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const getDepartments = async () => {
      const depts = await fetchDepartments()
      setDepartments(depts)
    }
    getDepartments()

    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/employees/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data.success) {
          const emp = response.data.employee
          setEmployee({
            emp_name: emp.user_id.name,
            emp_marital_status: emp.emp_marital_status,
            emp_designation: emp.emp_designation,
            emp_salary: emp.emp_salary,
            emp_dept: emp.emp_dept._id  // Assuming this is the correct way to reference department ID
          });
        }
      }
      catch (err) {
        if (err.response && !err.response.data.success) {
          alert(err.response.data.error);
        }
      }
    }
    fetchEmployees()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/employees/${id}`, employee, {
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
    <>{employee && departments ?
      <div className='max-w-4xl mx-auto mt-10 bg-white font-arima p-8 rounded-md shadow-md'>
        <h2 className="text-2xl font-bold mb-6">
          Edit Employee
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="emp_name" className='block text-sm font-medium text-gray-700'>Name</label>
              <input 
                onChange={handleChange} 
                value={employee.emp_name} 
                type="text" 
                name="emp_name" 
                placeholder='Add Employee Name' 
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md' 
                required 
              />
            </div>
            <div>
              <label htmlFor="emp_marital_status" className='block text-sm font-medium text-gray-700'>Employee Marital Status</label>
              <select 
                value={employee.emp_marital_status} 
                onChange={handleChange} 
                name="emp_marital_status" 
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md' 
                required
              >
                <option value="">Select Marital Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>
            <div>
              <label htmlFor="emp_designation" className='block text-sm font-medium text-gray-700'>Employee Designation</label>
              <input 
                value={employee.emp_designation} 
                onChange={handleChange} 
                type="text" 
                name="emp_designation" 
                placeholder='Add Employee Designation' 
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md' 
                required 
              />
            </div>
            <div>
              <label htmlFor="emp_salary" className='block text-sm font-medium text-gray-700'>Employee Salary</label>
              <input 
                value={employee.emp_salary} 
                onChange={handleChange} 
                type="number" 
                name="emp_salary" 
                placeholder='Add Employee Salary' 
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md' 
                required 
              />
            </div>
            <div className='col-span-2'>
              <label htmlFor="emp_dept" className='block text-sm font-medium text-gray-700'>Employee Department</label>
              <select 
                value={employee.emp_dept} 
                onChange={handleChange} 
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
          </div>
          <button type='submit' className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>Submit</button>
        </form>
      </div>
      : <div>Loading...</div>}
    </>
  )
}

export default EditEmployees