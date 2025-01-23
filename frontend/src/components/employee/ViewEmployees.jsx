import React, { useState, useEffect } from 'react'
import { data, useParams } from 'react-router-dom'
import axios from 'axios'

const ViewEmployees = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null)
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/employees/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                console.log(response.data)
                if (response.data.success) {
                    setEmployee(response.data.employee)
                }
            }
            catch (err) {
                if (err.response && !err.response.data.success) {
                    alert(err.response.data.error);
                }
            }
        }
        fetchEmployees()
    }, [])
    return (
        <> {employee ? 
            <div className='font-arima max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
                <h2 className='text-2xl font-bold mb-8 text-center'>
                    Employee Details
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                        <img className='h-80 w-80' src={`http://localhost:3000/${employee.user_id.profileImage}`} alt="" />
                    </div>
                    <div>
                        <div className="flex space-x-3 mb-3">
                            <p className='text-lg font-bold'>Name: </p>
                            <p className='font-medium'>{employee.user_id.name}</p>
                        </div>
                        <div className="flex space-x-3 mb-3">
                            <p className='text-lg font-bold'>Employee Id: </p>
                            <p className='font-medium'>{employee.emp_id}</p>
                        </div>
                        <div className="flex space-x-3 mb-3">
                            <p className='text-lg font-bold'>Date Of Birth: </p>
                            <p className='font-medium'>{new Date(employee.emp_dob).toLocaleDateString()}</p>
                        </div>
                        <div className="flex space-x-3 mb-3">
                            <p className='text-lg font-bold'>Gender: </p>
                            <p className='font-medium'>{employee.emp_gender}</p>
                        </div>
                        <div className="flex space-x-3 mb-3">
                            <p className='text-lg font-bold'>Department: </p>
                            <p className='font-medium'>{employee.emp_dept.dep_name}</p>
                        </div>
                        <div className="flex space-x-3 mb-3">
                            <p className='text-lg font-bold'>Marital Status: </p>
                            <p className='font-medium'>{employee.emp_marital_status}</p>
                        </div>
                        <div className="flex space-x-3 mb-3">
                            <p className='text-lg font-bold'>Designation: </p>
                            <p className='font-medium'>{employee.emp_designation}</p>
                        </div>
                        <div className="flex space-x-3 mb-3">
                            <p className='text-lg font-bold'>Salary: </p>
                            <p className='font-medium'>{employee.emp_salary}</p>
                        </div>
                    </div>
                </div>
            </div>
        :<div>Loading...</div>}
        </>
    )
}

export default ViewEmployees
