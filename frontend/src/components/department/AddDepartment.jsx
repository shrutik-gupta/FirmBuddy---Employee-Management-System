import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: '',
    dep_desc: ''
  })

  const navigate = useNavigate();

  const handleChange=(e)=>{
    const {name, value}= e.target;
    setDepartment({...department, [name] : value});
  }

  const handleSubmit= async(e)=>{
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:3000/api/departments/add', department, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success){
        navigate('/admin-dashboard/departments')      }
    }
    catch(err){
      if(err.response && !err.response.data.success){
        alert(err.response.data.error);
      }
    }
  }

  return (
    <div className='font-arima max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
        <h3 className='text-2xl font-bold mb-6'>Add Department</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="dep_name" className='text-sm font-medium text-gray-700'>Department Name</label>
            <input onChange={handleChange} type="text" placeholder='Enter Department Name' name='dep_name' className='mt-1 w-full p-2 border border-gray-300 rounded-md' required/>
          </div>
          <div className='mt-3'>
            <label htmlFor="dep_desc" className='block text-sm font-medium text-gray-700'>Department Description</label> 
            <textarea onChange={handleChange} name="dep_desc" placeholder='Description' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' rows="4"></textarea>
          </div>
          <button type='submit' className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>Add Department</button>
        </form>
    </div>
  )
}

export default AddDepartment
