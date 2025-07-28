import axios from "axios";
import { useNavigate } from "react-router-dom";


export const columns = [
    {
        name: "S No",
        selector: row => row.sno,
        width: "70px"
    },
    {
        name: "Name",
        selector: row => row.name,
        sortable: true,
        width: "150px"
    },
    {
        name: "Image",
        selector: (row) => row.profileImage,
        cell: (row) => (
            <img
                src={`http://localhost:5000/${row.profileImage}`}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
            />
        ),
        width: "100px"
    },
    {
        name: "Department",
        selector: row => row.dep_name,  
    },
    {
        name: "DOB",
        selector: row => row.dob,
        sortable: true
    },
    {
        name: "Action",
        cell: row => <EmployeeButtons _id={row._id} />,
        center: true
    }
];




export const fetchDepartments = async () => {
    let departments
    try {
        const response = await axios.get("http://localhost:5000/api/departments", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (response.data.success) {
            departments = response.data.departments

        }

    } catch (error) {
        if (error.response && !error.response.data.success) {
            alert(error.response.data.error);
        }
    }
    return departments;
};

export const EmployeeButtons = ({ _id, }) => {
    const navigate = useNavigate();



    return (
        <div className="flex items-center justify-center gap-1 w-full flex-nowrap mr-2">
            <button
                className="px-2 py-1 w-[80px] bg-green-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition"
                onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
            >
                View
            </button>
            <button
                className="px-2 py-1 w-[100px]  bg-blue-600 hover:bg-red-700 text-white rounded text-xs font-medium transition"
            >
                Edit
            </button>

            <button
                className="px-2 py-1 w-[100px]  bg-yellow-600 hover:bg-red-700 text-white rounded text-xs font-medium transition"
            >
                Salary
            </button>

            <button
                className="px-2 py-1 w-[100px]  bg-red-600 hover:bg-red-700 text-white rounded text-xs font-medium transition"
            >
                Leave
            </button>
        </div>






    );
};