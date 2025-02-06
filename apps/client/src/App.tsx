import './App.css'
import {  Route, Routes } from 'react-router'
import AuthLayout from './pages/authentication/layout'
import ChangePassword from './pages/authentication/change-password'
import Login from './pages/authentication/login'

export default function() {
  return (
      <Routes>
        <Route path='auth' element={<AuthLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='change-password' element={<ChangePassword />} />
        </Route>
      </Routes>
  )
}
