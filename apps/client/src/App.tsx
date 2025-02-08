import './App.css'
import {  Route, Routes } from 'react-router'
import AuthLayout from './pages/authentication/layout'
import DashboardLayout from './pages/dashboard/layout'
import ChangePassword from './pages/authentication/change-password'
import Login from './pages/authentication/login'
import Dashboard from './pages/dashboard'
import Users from './pages/users'

export default function() {
  return (
      <Routes>
        <Route path='auth' element={<AuthLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='change-password' element={<ChangePassword />} />
        </Route>
        <Route path='app' element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='users' element={<Users />} />
        </Route>
      </Routes>
  )
}
