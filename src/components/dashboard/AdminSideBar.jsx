import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUsers } from 'react-icons/fa';

const menuItems = [
    { to: "/admin-dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
    { to: "/admin-dashboard/employees", icon: <FaUsers />, label: "Employee" },
    { to: "/admin-dashboard/departments", icon: <FaBuilding />, label: "Department" },
    { to: "/admin-leaves", icon: <FaCalendarAlt />, label: "Leave" },
    { to: "/admin-dashboard/salary", icon: <FaMoneyBillWave />, label: "Salary" },
    { to: "/admin-settings", icon: <FaCogs />, label: "Settings" },
];

const AdminSideBar = () => {
    return (
        <div className="bg-gray-900 text-white h-screen fixed left-0 top-0 w-48 flex flex-col shadow-lg">
            <div className="bg-teal-600 h-16 flex items-center justify-center">
                <h3 className="text-2xl font-bold tracking-wide">Employee MS</h3>
            </div>
            <nav className="flex-1 py-6 space-y-2">
                {menuItems.map((item, idx) => (
                    <NavLink
                        key={idx}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex items-center px-4 py-3 rounded-lg transition-colors duration-200
                            ${isActive ? 'bg-teal-700 text-white border-l-8 border-teal-400' : 'hover:bg-teal-600 hover:text-white'}`
                        }
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span className="ml-4 font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default AdminSideBar;





// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUsers } from 'react-icons/fa';

// const menuItems = [
//     { to: "/admin-dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
//     { to: "/admin-employees", icon: <FaUsers />, label: "Employee" },
//     { to: "/admin-departments", icon: <FaBuilding />, label: "Department" },
//     { to: "/admin-leaves", icon: <FaCalendarAlt />, label: "Leave" },
//     { to: "/admin-salaries", icon: <FaMoneyBillWave />, label: "Salary" },
//     { to: "/admin-settings", icon: <FaCogs />, label: "Settings" },
// ];

// const AdminSideBar = () => {
//     const [hovered, setHovered] = useState(false);

//     return (
//         <div
//             className={`bg-gray-900 text-white h-screen fixed left-0 top-0 flex flex-col shadow-lg transition-all duration-300
//                 ${hovered ? 'w-48' : 'w-14'}`}
//             onMouseEnter={() => setHovered(true)}
//             onMouseLeave={() => setHovered(false)}
//         >
//             <div className="bg-teal-600 h-16 flex items-center justify-center">
//                 <h3 className="text-2xl font-bold tracking-wide transition-all duration-300">
//                     {hovered ? "Employee MS" : "EMS"}
//                 </h3>
//             </div>
//             <nav className="flex-1 py-6 space-y-2">
//                 {menuItems.map((item, idx) => (
//                     <NavLink
//                         key={idx}
//                         to={item.to}
//                         className={({ isActive }) =>
//                             `flex items-center px-4 py-3 rounded-lg transition-colors duration-200
//                             ${isActive ? 'bg-teal-700 text-white' : 'hover:bg-teal-600 hover:text-white'}`
//                         }
//                     >
//                         <span className="text-xl">{item.icon}</span>
//                         <span
//                             className={`ml-4 font-medium transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'} ${hovered ? '' : 'w-0 overflow-hidden'}`}
//                         >
//                             {item.label}
//                         </span>
//                     </NavLink>
//                 ))}
//             </nav>
//         </div>
//     );
// };

// export default AdminSideBar;