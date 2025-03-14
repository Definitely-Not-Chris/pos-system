import './App.css'
import {  Navigate, Route, Routes } from 'react-router'
import AuthLayout from './features/authentication/pages/layout'
import DashboardLayout from './features/dashboard/layout'
import ChangePassword from './features/authentication/pages/change-password'
import Login from './features/authentication/pages/login'
import Users from './features/users/pages'
import Invoices from './features/invoices/pages'
import Invoice from './features/invoices/pages/detail'
import Checks from './features/checks/pages'
import Transactions from './features/transactions/pages'
import Companies from './features/companies/pages'
import BillingStatements from './features/billing-statements/pages'
import BillingStatement from './features/billing-statements/pages/detail'
import { AuthContextWrapper, useAuth } from './providers/auth-provider'

function MainLayout () {
  const auth = useAuth()
    
  if(auth.user) {
    return <Navigate replace to='/app/users' />
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
          {/* <Route index element={<Dashboard />} /> */}
          <Route path='users' element={<Users />} />
          <Route path='billing-statements'>
            <Route index element={<BillingStatements />} />
            <Route path=':id' element={<BillingStatement />} />
          </Route>
          <Route path='invoices'>
            <Route index element={<Invoices />} />
            <Route path=':id' element={<Invoice />} />
          </Route>
          <Route path='transactions' element={<Transactions />} />
          <Route path='checks' element={<Checks />} />
          <Route path='companies' element={<Companies />} />
        </Route>
      </Routes>
    )
  }
)