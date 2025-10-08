import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="hero bg-base-100 py-30 mb-10">
  <div className="hero-content text-center">
    <div className="max-w-xl w-full">
      <h1 className="text-5xl font-bold">Learn. Build. Share Your Dev Journey 🚀</h1>
      <p className="py-6">
       Read insightful tech articles, share your coding experiences, and grow with a community that loves learning as much as you do.
      </p>
      <a href='#getStarted'  className='btn btn-primary'>Get Started</a>
    </div>
  </div>
</div>
  )
}
