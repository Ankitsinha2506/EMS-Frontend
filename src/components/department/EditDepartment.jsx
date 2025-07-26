import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditDepartment = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState({});
    const [departmentLoading, setDepartmentLoading] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        // Fetch departments data here
        const fetchDepartments = async () => {
            setDepartmentLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/departments/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                console.log(response.data);

                if (response.data.success) {
                    setDepartment(response.data.department);
                }

            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error || 'Error fetching departments');
                }
            } finally {
                setDepartmentLoading(false);
            }
        };
        fetchDepartments();

    }, [])

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
            const response = await axios.put(
                `http://localhost:5000/api/departments/${id}`,
                department,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            if (response.data.success) {
                // alert('Department updated successfully');
                navigate('/admin-dashboard/departments');
            } else {
                alert('Error updating department');
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error || 'Error updating department');
            }
        }
    }

    return (
        <>{departmentLoading ? <div>Loading....</div> :
            <div className="max-w-md mx-auto mt-10 bg-white rounded shadow p-6">
                <h3 className="text-2xl font-bold mb-6 text-center text-teal-700">Edit Department</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="dep_name" className="block text-gray-700 font-medium mb-2">
                            Department Name
                        </label>
                        <input
                            name="dep_name"
                            onChange={handleChange}
                            value={department.dep_name}
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
                            value={department.description}
                            placeholder="Enter Department Description"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                            rows={4}
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded font-semibold shadow transition-colors"
                    >
                        Edit Department
                    </button>
                </form>
            </div>
        }</>
    )
}

export default EditDepartment