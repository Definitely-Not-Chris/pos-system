import './App.css'
import {  Navigate, Outlet, Route, RouteObject, Routes, useRoutes } from 'react-router'
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
import { RoleEnum } from '@pos/core/enums/role'

function NotFoundRedirect () {
  const auth = useAuth()
    
  return <Navigate replace to={auth.redirect} />
}

function ProtectRoute(routes: RouteObject[], roles: RoleEnum[] = []) {
  const auth = useAuth()

  if(!auth.user) return []
  if(auth.user.role == RoleEnum.ADMIN) return routes
  if(roles.length > 0 && !roles.includes(auth.user.role)) return []

  return routes
}


export default AuthContextWrapper(function() {
  const element = useRoutes([
    {
      path: 'auth',
      element: <AuthLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'change-password', element: <ChangePassword /> },
      ]
    },
    ...ProtectRoute([
      {
        path: 'app',
        element: <DashboardLayout />,
        children: [
          ...ProtectRoute([ { path: 'users', element: <Users /> } ]),
          ...ProtectRoute([
            { path: 'transactions', element: <Transactions /> },
            { path: 'checks', element: <Checks /> }
          ], [RoleEnum.INVOICE, RoleEnum.PAYMENT]),
          ...ProtectRoute([
            { 
              path: 'billing-statements', 
              children: [
                { index: true, element: <BillingStatements /> },
                { path: ':id', element: <BillingStatement /> }
              ]
            },
            { 
              path: 'invoices', 
              children: [
                { index: true, element: <Invoices /> },
                { path: ':id', element: <Invoice /> }
              ]
            },
            { path: 'companies', element: <Companies /> }
          ], [RoleEnum.INVOICE]),
        ]
      }
    ]),

    {
      path: '*',
      element: <NotFoundRedirect />,
    },
  ])

  return element    
})