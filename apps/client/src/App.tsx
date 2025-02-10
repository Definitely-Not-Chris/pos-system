import './App.css'
import {  Route, Routes } from 'react-router'
import AuthLayout from './features/authentication/pages/layout'
import DashboardLayout from './features/dashboard/layout'
import ChangePassword from './features/authentication/pages/change-password'
import Login from './features/authentication/pages/login'
import Dashboard from './features/dashboard/pages'
import Users from './features/users/pages'

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
