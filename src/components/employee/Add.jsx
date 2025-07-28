import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelper'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Add = () => {

    const [departments, setDepartments] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        employeeId: '',
        dob: '',
        gender: '',
        maritalStatus: '',
        designation: '',
        department: '',
        salary: '',
        password: '',
        role: '',
        image: null
    })
    const navigate = useNavigate()

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
        };
        getDepartments();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
  e.preventDefault();

  const formPayload = new FormData();
  formPayload.append("name", formData.name);
  formPayload.append("email", formData.email);
  formPayload.append("employeeId", formData.employeeId);
  formPayload.append("dob", formData.dob);
  formPayload.append("gender", formData.gender);
  formPayload.append("maritalStatus", formData.maritalStatus);
  formPayload.append("designation", formData.designation);
  formPayload.append("department", formData.department);
  formPayload.append("salary", formData.salary);
  formPayload.append("password", formData.password);
  formPayload.append("role", formData.role);
  formPayload.append("image", formData.image);

  try {
    const response = await axios.post('http://localhost:5000/api/employees/add', formPayload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.data.success) {
      navigate('/admin-dashboard/employees');
    } else {
      alert('Error adding Employee');
    }
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || 'Server error while adding employee');
  }
};




    return (
        <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-6'>Add New Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {/* Name */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Name</label>
                        <input
                            type='text'
                            name='name'
                            placeholder='Insert Name'
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Email</label>
                        <input
                            type='email'
                            name='email'
                            placeholder='Insert Email'
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            required
                        />
                    </div>

                    {/* Employee ID */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Employee ID</label>
                        <input
                            type='text'
                            name='employeeId'
                            placeholder='Employee ID'
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            required
                        />
                    </div>

                    {/* Date Of Birth */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Date of Birth</label>
                        <input
                            type='date'
                            name='dob'
                            placeholder='DOB'
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            required
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Gender</label>
                        <select
                            name='gender'
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            required
                        >
                            <option value=''>Select Gender </option>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                            <option value='others'>Others</option>

                        </select>
                    </div>

                    {/* Marital Status */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Marital Status</label>
                        <select
                            name='maritalStatus'
                            placeholder="Marital Status"
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            required
                        >
                            <option value=''>Select Status </option>
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
                            placeholder='Designation'
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            required
                        />
                    </div>

                    {/* Department */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Department</label>
                        <select
                            name='department'
                            // placeholder="Marital Status"
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            onChange={handleChange}
                            required
                        >
                            <option value=''>Select Department </option>
                            {departments.map(dep => (
                                <option key={dep._id} value={dep._id}>
                                    {dep.dep_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Salary */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Salary</label>
                        <input
                            type='number'
                            name='salary'
                            placeholder='Salary'
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Password</label>
                        <input
                            type='password'
                            name='password'
                            placeholder='Password'
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            required
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Role</label>
                        <select
                            name='role'
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            onChange={handleChange}
                            required
                        >
                            <option value=''>Select Role </option>
                            <option value='admin'>Admin</option>
                            <option value='employee'>Employee</option>
                        </select>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            placeholder='Image Upload'
                            accept="image/*"

                            className="file:mr-4 file:py-2 file:px-4
               file:rounded-md file:border-0
               file:text-sm file:font-semibold
               file:bg-gray-100 file:text-blue-700
               hover:file:bg-gray-200
               block w-full text-sm text-gray-600 border border-gray-300 rounded-md cursor-pointer bg-white focus:outline-none"
                            required
                        />
                    </div>

                </div>

                <button
                    type='submit'
                    className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'
                >Add Employee
                </button>
            </form>
        </div>
    )
}

export default Add