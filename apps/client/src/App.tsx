import './App.css'
import {  Navigate, Route, Routes } from 'react-router'
import AuthLayout from './features/authentication/pages/layout'
import DashboardLayout from './features/dashboard/layout'
import ChangePassword from './features/authentication/pages/change-password'
import Login from './features/authentication/pages/login'
import Dashboard from './features/dashboard/pages'
import Users from './features/users/pages'
import Invoices from './features/invoices/pages'
import { AuthContextType, AuthContextWrapper, useAuth } from './providers/auth-provider'

function MainLayout () {
  const auth = useAuth()
    
  if(auth.user) {
    return <Navigate replace to='/app' />
  }

  return <Navigate replace to='/auth/login' />
}

export default AuthContextWrapper(function() {
    return (
      <Routes>
        <Route path="*" element={<MainLayout />} />
        <Route path='auth' element={<AuthLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='change-password' element={<ChangePassword />} />
        </Route>
        <Route path='app' element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='users' element={<Users />} />
          <Route path='invoices' element={<Invoices />} />
        </Route>
      </Routes>
    )
  }
)