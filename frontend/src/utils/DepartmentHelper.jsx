import { useNavigate } from "react-router-dom"
import axios from "axios";

export const columns = [
    {
        name: 'Serial No.',
        selector: (row) => row.sno
    },
    {
        name: 'Department Name',
        selector: (row) => row.dep_name
    },
    {
        name: 'Action',
        selector: (row) => row.action
    }
]

export const DepartmentButtons = ({ _id, onDeptDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const confirm = window.confirm('Do you want to delete this?')
        if(confirm){
            try {
                const response = await axios.delete(`http://localhost:3000/api/departments/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.success) {
                    onDeptDelete(id);
                }
            }
            catch (err) {
                if (err.response && !err.response.data.success) {
                    alert(err.response.data.error);
                }
            }
        }
    }

    return (
        <div className="flex space-x-3">
            <button className="px-3 py-1 bg-teal-600 text-white" onClick={() => navigate(`/admin-dashboard/departments/${_id}`)}>Edit</button>
            <button className="px-3 py-1 bg-red-500 text-white" onClick={() => handleDelete(_id)}>Delete</button>
        </div>
    )
}