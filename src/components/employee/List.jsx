import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const List = () => {
    const [employees, setEmployees] = useState([]);
    const [employeeLoading, setEmployeeLoading] = useState(false);

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmployeeLoading(true);
            try {
                const response = await axios.get("http://localhost:5000/api/employees", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                console.log(response.data);


                if (response.data.success && Array.isArray(response.data.employees)) {
                    let sno = 1;
                    const data = response.data.employees.map((emp) => ({
                        _id: emp._id,
                        sno: sno++,
                        dep_name: emp.department?.dep_name || 'N/A',
                        name: emp.userId?.name || 'N/A',
                        dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : 'N/A',
                        profileImage: emp.userId?.profileImage || '',

                        action: (<EmployeeButtons _id={emp._id} />)
                    }));
                    setEmployees(data);
                } else {
                    setEmployees([]); // fallback
                }

            } catch (error) {
                alert(error.response?.data?.error || 'Error fetching employees');
            } finally {
                setEmployeeLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div className='p-6'>
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold">Manage Employee</h3>
            </div>

            <div className="flex flex-wrap md:flex-nowrap justify-between items-center mb-4 gap-4">
                <input
                    type="text"
                    placeholder="Search Department"
                    className="px-4 py-2 border rounded w-full md:w-1/2"
                />
                <Link
                    to="/admin-dashboard/add-employee"
                    className="px-4 py-2 bg-teal-600 rounded text-white hover:bg-teal-700 transition-colors whitespace-nowrap"
                >
                    Add New Employee
                </Link>
            </div>

            <div>
                <DataTable
                    columns={columns}
                    data={employees}
                />
            </div>
        </div>
    )
}

export default List;
