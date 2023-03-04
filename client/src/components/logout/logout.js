
import React from 'react'
import "./logout.css"
import { useNavigate } from "react-router-dom"

const Logout = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    // localStorage.removeItem("Authorization")
    localStorage.setItem("Authorization", "")
    // localStorage.removeItem("name")
    navigate("/")
  }
  return (
    <>
      <div className='logoutbtn'>
        <p onClick={handleLogout}>Logout</p>
      </div>

    </>
  )
}

export default Logout;
