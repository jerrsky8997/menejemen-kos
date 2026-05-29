import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import DashboardLayout from './layouts/DashboardLayout'
import TenantRegistration from './pages/TenantRegistration'
import AddRoom from './pages/AddRoom'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<DashboardLayout />} > 
        <Route index element ={<Dashboard />} />
        <Route path="tenant/registration" element={<TenantRegistration />} />
        <Route path="room/add-room" element={<AddRoom />} />
      </Route>
    </Routes>
  )
}

export default App