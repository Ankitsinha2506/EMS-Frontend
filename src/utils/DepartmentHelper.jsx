// ✅ DepartmentHelper.js
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ Added missing import
import React from "react";

// ✅ CHANGED: Now columns is a function to receive delete callback
export const columns = (onDepartmentDelete) => [
    {
        name: "S No",
        selector: (row) => row.sno,
        // width:"100px"
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true,
        width:""
        
    },
    {
        name: "Action",
        cell: (row) => <DepartmentButtons _id={row._id} onDepartmentDelete={onDepartmentDelete} />,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        width:"120px"

    }
];

// ✅ FIXED: Typo from 'naivigate' to 'navigate'
export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/departments/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.data.success) {
                alert("Department deleted successfully");
                onDepartmentDelete(id); // ✅ pass deleted id
            }
        } catch (error) {
            alert(error?.response?.data?.error || "Error deleting department");
        }
    };

    return (
        <div className="flex items-center justify-center gap-1 w-full flex-nowrap mr-2">
            <button
                className="px-2 py-1 w-[75px] bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition"
                onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
            >
                Edit
            </button>
            <button
                className="px-2 py-1 w-[75px]  bg-red-600 hover:bg-red-700 text-white rounded text-xs font-medium transition"
                onClick={() => handleDelete(_id)}
            >
                Delete
            </button>
        </div>






    );
};
