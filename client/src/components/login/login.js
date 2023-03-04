

import React from 'react'
import axios from "axios"
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import "./login.css"

function Login() {
    const [signupState, setSignupState] = useState({})
    const navigate = useNavigate()

    const handleLogin = () => {
        // e.preventDefault()
        console.log(signupState.username)
        axios({
            url: "https://todo-list-server-qued.onrender.com/login",
            // url: "http://localhost:5000/login",
            method: "post",
            data: { username: signupState.username, password: signupState.password }
        }).then((res) => {
            console.log(res.data)
            if(res.data.authToken){
                localStorage.setItem("Authorization", res.data.authToken)
                navigate("/todo")
            }else{
                alert(res.data)
                navigate("/")
            }
            // localStorage.setItem("Authorization", res.data.authToken)
            // navigate("/todo")
            // if(localStorage.getItem("Authorization")){
            //     navigate("/todo")
            // }else{
            //     navigate("/")
            // }
            

        }).catch((err) => {
            console.log(err)
            alert(err.response.data)
            // navigate("/")
        })
        navigate("/todo")
        // if(localStorage.getItem("Authorization")){
        //     navigate("/todo")
        // }else{
        //     navigate("/todo")
        // }
    }
    return (
        <div className='login-container'>
            <div className='login-innerContainer'>
                <form action=''>
                    <p>Login</p>
                    <div>
                        <input type="text" id="username" name="username" placeholder='UserName' onChange={(e) => { setSignupState({ ...signupState, username: e.target.value }) }}></input>
                    </div>
                    <div>
                        <input type="password" id="password" name="password" placeholder='password' onChange={(e) => { setSignupState({ ...signupState, password: e.target.value }) }}></input>
                    </div>

                    <div>
                        <button onClick={handleLogin} className="signbtn">Submit</button>
                    </div>
                    <div>
                        <p onClick={() => navigate("/signup")} className="signbtn">Sign-Up</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;