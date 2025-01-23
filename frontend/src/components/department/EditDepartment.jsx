import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditDepartment = () => {
    const { id } = useParams()
    const [deptRecord, setDeptRecord] = useState([])
    const [deptLoading, setDeptLoading] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {
        const fetchDepartments = async () => {
            setDeptLoading(true)
            try {
                const response = await axios.get(`http://localhost:3000/api/departments/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.success) {
                    setDeptRecord(response.data.department)
                }
            }
            catch (err) {
                if (err.response && !err.response.data.success) {
                    alert(err.response.data.error);
                }
            }
            finally {
                setDeptLoading(false)
            }
        }
        fetchDepartments()
    }, [])


    const handleChange = (e) => {
        setDeptRecord({...deptRecord, [e.target.name]: e.target.value })
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
          const response = await axios.put(`http://localhost:3000/api/departments/${id}`, deptRecord, {
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
        <>
            {deptLoading ? <div>Loading...</div> :
                <div className='font-arima max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
                    <h3 className='text-2xl font-bold mb-6'>Edit Department</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="dep_name" className='text-sm font-medium text-gray-700'>Department Name</label>
                            <input value={deptRecord.dep_name} onChange={handleChange} type="text" placeholder='Enter Department Name' name='dep_name' className='mt-1 w-full p-2 border border-gray-300 rounded-md' required />
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="dep_desc" className='block text-sm font-medium text-gray-700'>Department Description</label>
                            <textarea value={deptRecord.dep_desc} onChange={handleChange} name="dep_desc" placeholder='Description' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' rows="4"></textarea>
                        </div>
                        <button type='submit' className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>Edit Department</button>
                    </form>
                </div>
            }</>
    )
}

export default EditDepartment
