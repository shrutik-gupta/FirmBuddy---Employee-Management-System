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
import EmployeeList from './components/employee/EmployeeList';
import AddEmployee from './components/employee/AddEmployee';
import EditEmployees from './components/employee/EditEmployees';
import ViewEmployees from './components/employee/ViewEmployees';
import AddSalary from './components/salary/AddSalary';
import ViewSalary from './components/salary/ViewSalary';
import EmpSummary from './components/EmployeeDashboard/EmpSummary';
import EmpProfile from './components/EmployeeDashboard/EmpProfile';
import LeaveList from './components/leaves/LeaveList';
import AddLeave from './components/leaves/AddLeave';
import Settings from './components/EmployeeDashboard/Settings';
import AdminLeaveList from './components/leaves/AdminLeaveList';
import LeaveDetail from './components/leaves/LeaveDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={['admin']}>
                <AdminDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />}></Route>
          <Route path='/admin-dashboard/departments' element={<DepartmentList />}></Route>
          <Route path='/admin-dashboard/add-department' element={<AddDepartment />}></Route>
          <Route path='/admin-dashboard/departments/:id' element={<EditDepartment />}></Route>

          <Route path='/admin-dashboard/employees' element={<EmployeeList />}></Route>
          <Route path='/admin-dashboard/add-employee' element={<AddEmployee />}></Route>
          <Route path='/admin-dashboard/employees/:id' element={<ViewEmployees />}></Route>
          <Route path='/admin-dashboard/employees/edit/:id' element={<EditEmployees />}></Route>

          <Route path='/admin-dashboard/employees/salaries/:id' element={<ViewSalary />}></Route>
          <Route path='/admin-dashboard/salary' element={<AddSalary />}></Route>

          <Route path='/admin-dashboard/employees/leaves/:id' element={<LeaveList />}></Route>
          <Route path='/admin-dashboard/leaves' element={<AdminLeaveList />}></Route>
          <Route path='/admin-dashboard/leaves/:id' element={<LeaveDetail />}></Route>

          <Route path='/admin-dashboard/settings' element={<Settings />}></Route>

        </Route>

        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={['admin', 'employee']}>
                <EmployeeDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<EmpSummary />}></Route>
          <Route path='/employee-dashboard/profile/:id' element={<EmpProfile />}></Route>

          <Route path='/employee-dashboard/leaves/:id' element={<LeaveList />}></Route>
          <Route path='/employee-dashboard/add-leave' element={<AddLeave />}></Route>

          <Route path='/employee-dashboard/salary/:id' element={<ViewSalary />}></Route>
          <Route path='/employee-dashboard/settings' element={<Settings />}></Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
