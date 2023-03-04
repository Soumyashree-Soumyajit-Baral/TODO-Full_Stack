// import React from 'react'
import {Outlet, Navigate} from "react-router-dom"

const Protective = () => {
    const token= localStorage.getItem("Authorization")
  return (
    <>
        {token ? <Outlet/> : <Navigate to="/" />}
    </>
  )
}

export default Protective
