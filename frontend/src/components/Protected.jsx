import React from 'react'
import {useSelector} from "react-redux"
import { Navigate, Outlet} from "react-router-dom"

export default function Protected() {
    const {user, loading} = useSelector((state) => state.auth)

    if(loading) return <h1>Loading..</h1>
    if(!user) return <Navigate to="/login" replace />
  return <Outlet />
}
