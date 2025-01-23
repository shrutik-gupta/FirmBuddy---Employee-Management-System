import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const ViewSalary = () => {

    const [salaries, setSalaries] = useState(null)
    const [filteredSalaries, setFilteredSalaries] = useState(null)
    const { id } = useParams()
    let sno = 1;

    const fetchSalaries = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/salary/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            setSalaries(response.data.salary || []);
            setFilteredSalaries(response.data.salary || []);
        }
        catch (err) {
            console.error('Salary fetch error:', err);
            alert(err.response?.data?.message || err.message || 'Failed to fetch salaries');
            setSalaries([]);
            setFilteredSalaries([]);
        }
    };
    useEffect(() => {
        fetchSalaries();
    }, [])

    const filterSalaries = (query) => {
        const filteredRecords = salaries.filter((salary) =>
            salary.emp_pay_date.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredSalaries(filteredRecords);
    };


    return (
        <> {filteredSalaries === null ? (<div>Loading...</div>) : (
            <div className="p-5 overflow-x-auto">
                <div className="text-center">
                    <h2 className='text-2xl font-bold'>Salary History</h2>
                </div>
                <div className="flex justify-end my-3">
                    <input
                        type="text"
                        placeholder="Search by Pay Date"
                        className="border px-2 rounded-md py-0.5 border-gray-300"
                        onChange={(e) => filterSalaries(e.target.value)}
                    />

                </div>
                {filteredSalaries.length > 0 ?
                    (<table className='w-full text-sm text-left text-gray-500'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
                            <tr>
                                <th className='px-6 py-3'>SNO</th>
                                <th className='px-6 py-3'>Emp Id</th>
                                <th className='px-6 py-3'>Salary</th>
                                <th className='px-6 py-3'>Allowance</th>
                                <th className='px-6 py-3'>Deduction</th>
                                <th className='px-6 py-3'>Total</th>
                                <th className='px-6 py-3'>Pay Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSalaries.map((salary) => (
                                <tr key={salary._id} className="bg-white border-b ">
                                    <td className="px-6 py-3">{sno++}</td>
                                    <td className="px-6 py-3">{salary.emp_id.emp_id}</td>
                                    <td className="px-6 py-3">{salary.emp_basic_salary}</td>
                                    <td className="px-6 py-3">{salary.emp_allowances}</td>
                                    <td className="px-6 py-3">{salary.emp_deductions}</td>
                                    <td className="px-6 py-3">{salary.emp_net_salary}</td>
                                    <td className="px-6 py-3">{new Date(salary.emp_pay_date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>) : (<div>No Records found</div>)
                }
            </div>
        )}
        </>
    )
}

export default ViewSalary
