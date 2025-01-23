import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper'
import axios from 'axios'

const DepartmentList = () => {

  const [departments, setDepartments] = useState([])
  const [deptLoading, setDeptLoading] = useState(false)
  const [filterdDepartments, setfilterdDepartments] = useState([])

  const fetchDepartments = async()=>{
    setDeptLoading(true)
    try{
      const response = await axios.get('http://localhost:3000/api/departments', {
        headers : {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success){
        let sno = 1;
        const data = await response.data.departments.map((dept)=>(
          {
            _id : dept._id, //from db
            sno: sno++, //we made
            dep_name : dept.dep_name, //from db
            action: (<DepartmentButtons _id={dept._id} onDeptDelete={onDeptDelete}/>) //we made
          }
        ))
        setDepartments(data)
        setfilterdDepartments(data)
      }
    }
    catch(err){
      if(err.response && !err.response.data.success){
        alert(err.response.data.error);
      }
    }
    finally{
      setDeptLoading(false)
    }
  }

  const onDeptDelete = async(id)=>{
    const data = departments.filter(dep => dep._id !== id)
    setDepartments(data)
    setfilterdDepartments(data)
    fetchDepartments() //update the list after deleting a department
  }

  useEffect(() =>{ 
    fetchDepartments()
  }, [])

  const filterDepartments = (e)=>{
      const records = departments.filter(
        (dept)=>
          dept.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
      )
      setfilterdDepartments(records)
  }

  return (
    <div className='font-arima p-5 '>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Departments</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input onChange={filterDepartments} type="text" placeholder='Search Departments' className='px-4 py-0.5 border' />
        <Link to='/admin-dashboard/add-department' className='px-4 py-1 bg-teal-600 rounded text-white'>Add New Department</Link>
      </div>
      {
        deptLoading ? 
          <div>Loading...</div> : 
          <div className='mt-5'>
            <DataTable columns={columns} data={filterdDepartments} pagination/>
          </div>
      }
    </div>

  )
}

export default DepartmentList
