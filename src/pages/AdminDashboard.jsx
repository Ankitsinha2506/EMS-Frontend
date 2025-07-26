import React from 'react'

import AdminSideBar from '../components/dashboard/AdminSideBar';
import Navbar from '../components/dashboard/Navbar';
import AdminSummary from '../components/dashboard/AdminSummary';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {

  return (
    <div className="flex">
      <AdminSideBar />
      <div className='flex-1 ml-48 bg-gray-100 h-screen'>
        <Navbar />
        {/* <AdminSummary /> */}
        <Outlet /> 
      </div>
    </div>
  )
}

export default AdminDashboard