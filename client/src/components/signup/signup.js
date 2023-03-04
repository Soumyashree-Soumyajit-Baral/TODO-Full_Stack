import React from 'react'
import axios from "axios"
import {useState} from 'react'
import {useNavigate} from "react-router-dom"
import "./signup.css"

function Signup() {
    const [signupState, setSignupState]=useState({})
    const navigate=useNavigate()

    const handleUser=()=>{
        
        if(signupState.password===signupState.cpassword){
            axios({
                url:"https://todo-list-server-qued.onrender.com/signup",
                // url:"http://localhost:5000/signup",
                method:"POST",
                data:{username:signupState.username, password:signupState.password}
            }).then((res)=>{
                console.log(res.data)
                alert(res.data)
            }).catch((err)=>{
                console.log(err)
                alert(err.response.data)
            })
        }else{
            alert("Password did not match")
        }
        navigate("/")
    }

  return (
    <div className='logout-container'>
        <div className='logout-innerContainer'>
            <form action=''>
            <p>Create New Account</p>
            <div>
                <input type="text" id="username" name="username" placeholder='UserName' onChange={(e)=>{setSignupState({...signupState,username:e.target.value})}}></input>
            </div>
            <div>
                <input type="password" id="password" name="password" placeholder='password' onChange={(e)=>{setSignupState({...signupState,password:e.target.value})}}></input>
            </div>
            <div>
                <input type="password" id="cpassword" name="cpassword" placeholder='confirm password' onChange={(e)=>{setSignupState({...signupState,cpassword:e.target.value})}}></input>
            </div>
            <div>
                <button onClick={handleUser} className="signbtn">Submit</button>
            </div>
            </form>
        </div>
    </div>
  )
}

export default Signup