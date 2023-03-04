import React from 'react'
import {Outlet, Navigate} from "react-router-dom"

const Protective = () => {
    const token= localStorage.getItem("Authorization")
  return (
    <div>
        {token ? <Outlet/> : <Navigate to="/" />}
    </div>
  )
}

export default Protective
