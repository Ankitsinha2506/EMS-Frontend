import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBasedRoutes from './utils/RoleBasedRoutes';
import AdminSummary from './components/dashboard/AdminSummary';
import DepartmentList from './components/department/DepartmentList';
import AddDepartment from './components/department/AddDepartment';
import EditDepartment from './components/department/EditDepartment';
import List from './components/employee/List';
import Add from './components/employee/Add';
import View from './components/employee/View';
import Edit from './components/employee/Edit';
import AddSalary from './components/salary/AddSalary';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />
          // <PrivateRoutes>
          //   <RoleBasedRoutes requiredRole={['admin']}>
          //     <AdminDashboard />
          //   </RoleBasedRoutes>
          // </PrivateRoutes>
        } >
          <Route index element={<AdminSummary />}></Route>
          <Route path="/admin-dashboard/departments" element={<DepartmentList />} ></Route>
          <Route path="/admin-dashboard/add-department" element={<AddDepartment />} ></Route>
          <Route path="/admin-dashboard/department/:id" element={<EditDepartment />} ></Route>
          <Route path="/admin-dashboard/employees" element={<List />} ></Route>
          <Route path="/admin-dashboard/add-employee" element={<Add />} ></Route>
          <Route path="/admin-dashboard/employees/:id" element={<View />} ></Route>
          <Route path="/admin-dashboard/employees/edit/:id" element={<Edit />} ></Route>


          <Route path='/admin-dashboard/salary' element={<AddSalary />  }></Route>


        </Route>

        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
