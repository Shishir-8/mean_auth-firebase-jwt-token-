import React from 'react'
import Home from './Home'
import Blog from '../components/Blog'

export default function Dashboard() {
  return (
    <div className='container mx-auto'>
      <Home />

      <div className='container p-5' >
        <h1 id="getStarted" className='underline underline-offset-8 decoration-purple-500 text-3xl font-bold tracking-wide mb-7'>Latest Blogs</h1>
       <div className="grid gap-10 place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Blog />
        <Blog />
        <Blog />
        <Blog />
        <Blog />
        <Blog />
       </div>
      </div>
    </div>
  )
}
