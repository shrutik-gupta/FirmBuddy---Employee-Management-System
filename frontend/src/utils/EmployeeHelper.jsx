import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
      name: 'Serial',
      selector: (row) => row.sno,
      width: '70px'
  },
  {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
      width: '280px',
  },
  {
      name: 'Image',
      selector: (row) => row.profileImage,
      width: '140px',
      
  },
  {
      name: 'Department',
      selector: (row) => row.dep_name,
      width: '280px'
  },
  {
      name: 'DOB',
      selector: (row) => row.dob,
      sortable: true,
      width: '140px'
  },
  {
      name: 'Action',
      selector: (row) => row.action,
      // center: true
  }
]


export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get('http://localhost:3000/api/departments', {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (response.data.success) {
      departments = response.data.departments
    }
  }
  catch (err) {
    if (err.response && !err.response.data.success) {
      alert(err.response.data.error);
    }
  }
  return departments;
}
export const fetchEmployees = async (deptId) => {
  let employees;
  try {
    const response = await axios.get(`http://localhost:3000/api/employees/department/${deptId}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (response.data.success) {
      console.log(response.data.employees)
      employees = response.data.employees
    }
  }
  catch (err) {
    if (err.response && !err.response.data.success) {
      alert(err.response.data.error);
    }
  }
  
  return employees;
}

export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();


  return (
    <div className="flex space-x-3">
      <button className="px-3 py-1 bg-teal-600 text-white" onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}>View</button>
      <button className="px-3 py-1 bg-blue-500 text-white" onClick={()=> navigate(`/admin-dashboard/employees/edit/${Id}`)}>Edit</button>
      <button className="px-3 py-1 bg-yellow-500 text-white" onClick={()=> navigate(`/admin-dashboard/employees/salaries/${Id}`)}>Salary</button>
      <button className="px-3 py-1 bg-red-500 text-white" onClick={()=> navigate(`/admin-dashboard/employees/leaves/${Id}`)}>Leave</button>
    </div>
  )
}