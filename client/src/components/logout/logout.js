
import React from 'react'
import "./logout.css"
import {useNavigate} from "react-router-dom"
function Logout() {
    const navigate=useNavigate()
    const handleLogout=()=>{
        localStorage.setItem("Authorization", "")
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
