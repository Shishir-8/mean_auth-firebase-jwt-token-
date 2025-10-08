import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Protected from './components/Protected'
import MainLayout from './layouts/MainLayout'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route element={<MainLayout />}>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route element={<Protected />}>
      <Route path="/dashboard" element={<Dashboard />} />
      </Route>

    </Route>

    </Routes>
    </BrowserRouter>
  )
}
