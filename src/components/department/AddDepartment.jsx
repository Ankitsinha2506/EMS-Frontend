import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddDepartment = () => {
    const [department, setDepartment] = useState({
        dep_name: '',
        description: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({
            ...department,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(
            "http://localhost:5000/api/departments/add",
            department,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }
        );
        if (response.data.success) {
            navigate('/admin-dashboard/departments');
        } else {
            alert('Error adding department');
        }
    } catch (error) {
        if (error.response && !error.response.data.success) {
            alert(error.response.data.error || 'Error adding department');
        }
    }
};


    return (
        <div className="max-w-md mx-auto mt-10 bg-white rounded shadow p-6">
            <h3 className="text-2xl font-bold mb-6 text-center text-teal-700">Add Department</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="dep_name" className="block text-gray-700 font-medium mb-2">
                        Department Name
                    </label>
                    <input
                        name="dep_name"
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter Department Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                        Description
                    </label>
                    <textarea
                        name="description"
                        onChange={handleChange}
                        placeholder="Enter Department Description"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                        rows={4}
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded font-semibold shadow transition-colors"
                >
                    Add Department
                </button>
            </form>
        </div>
    );
};

export default AddDepartment;