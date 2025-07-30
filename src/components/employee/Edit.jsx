import React, { useEffect, useState } from 'react';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const [employee, setEmployee] = useState({
        name: '',
        maritalStatus: '',
        designation: '',
        salary: 0,
        department: '',
    });
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
        };
        getDepartments();
    }, []);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/employees/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (response.data.success) {
                    const emp = response.data.employee;
                    setEmployee({
                        name: emp.userId.name,
                        email: emp.userId.email,
                        employeeId: emp.employeeId,
                        dob: emp.dob ? emp.dob.split('T')[0] : '',
                        gender: emp.gender,
                        maritalStatus: emp.maritalStatus || '',
                        designation: emp.designation,
                        department: emp.department?._id || '',
                        salary: emp.salary,
                    });
                }
            } catch (error) {
                alert(error.response?.data?.error || 'Error fetching employee');
            }
        };

        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:5000/api/employees/${id}`, employee, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.data.success) {
                navigate('/admin-dashboard/employees');
            } else {
                alert('Error updating Employee');
            }
        } catch (error) {
            console.error(error.message);
            alert(error.response?.data?.message || 'Server error while updating employee');
        }
    };

    if (!employee || departments.length === 0) return <div>Loading...</div>;

    return (
        <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-6'>Edit Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                    {/* Name */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Name</label>
                        <input
                            type='text'
                            name='name'
                            value={employee.name}
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            required
                        />
                    </div>


                    {/* Marital Status */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Marital Status</label>
                        <select
                            name='maritalStatus'
                            value={employee.maritalStatus}
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        >
                            <option value=''>Select Status</option>
                            <option value='single'>Single</option>
                            <option value='married'>Married</option>
                        </select>
                    </div>

                    {/* Designation */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Designation</label>
                        <input
                            type='text'
                            name='designation'
                            value={employee.designation}
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            required
                        />
                    </div>

                    {/* Salary */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Salary</label>
                        <input
                            type='number'
                            name='salary'
                            value={employee.salary}
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            required
                        />
                    </div>

                    {/* Department */}
                    <div className='col-span-2'>
                        <label className='block text-sm font-medium text-gray-700'>Department</label>
                        <select
                            name='department'
                            value={employee.department}
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            required
                        >
                            <option value=''>Select Department</option>
                            {departments.map(dep => (
                                <option key={dep._id} value={dep._id}>
                                    {dep.dep_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button
                    type='submit'
                    className='w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                >
                    Update Employee
                </button>
            </form>
        </div>
    );
};

export default Edit;
