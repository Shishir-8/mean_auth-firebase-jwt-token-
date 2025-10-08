import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className='min-h-screen flex flex-col'>
        <Header />

        <main className=' container mx-auto px-4 py-4 lg:px-8'>
            <Outlet />
        </main>

    </div>
  )
}
