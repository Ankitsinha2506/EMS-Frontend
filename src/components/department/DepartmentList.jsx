import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns } from '../../utils/DepartmentHelper';
import axios from 'axios';

const DepartmentList = () => {
  const [department, setDepartment] = useState([]);
  const [departmentLoading, setDepartmentLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const onDepartmentDelete = (id) => {
    const updatedDepartments = department.filter(dep => dep._id !== id);
    setDepartment(updatedDepartments);
    setFilteredDepartments(updatedDepartments);
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepartmentLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/departments", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map(dep => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name
          }));
          setDepartment(data);
          setFilteredDepartments(data); // ✅ Initialize filtered data
        }

      } catch (error) {
        alert(error.response?.data?.error || 'Error fetching departments');
      } finally {
        setDepartmentLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const search = e.target.value.toLowerCase();
    const records = department.filter(dep =>
      dep.dep_name.toLowerCase().includes(search)
    );
    setFilteredDepartments(records);
  };

  return (
    <>
      {departmentLoading ? (
        <div>Loading......</div>
      ) : (
        <div className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold">Manage Departments</h3>
          </div>

          <div className="flex flex-wrap md:flex-nowrap justify-between items-center mb-4 gap-4">
            <input
              type="text"
              placeholder="Search Department"
              className="px-4 py-2 border rounded w-full md:w-1/2"
              onChange={filterDepartments}
            />
            <Link
              to="/admin-dashboard/add-department"
              className="px-4 py-2 bg-teal-600 rounded text-white hover:bg-teal-700 transition-colors whitespace-nowrap"
            >
              Add New Department
            </Link>
          </div>

          <div className='mt-5 overflow-x-auto'>
            <DataTable
              columns={columns(onDepartmentDelete)}
              data={filteredDepartments}
              pagination
              responsive
              highlightOnHover
              dense
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
