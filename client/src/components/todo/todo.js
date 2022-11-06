import React from 'react'

import {useState, useEffect} from "react"
import axios from 'axios'
import Logout from '../logout/logout'
import "./todo.css"

function Todo() {
    const [uname, setUname]=useState("")
    const [act,setAct]=useState({})
    const [actList, setActList]=useState([])
    const handleAdd=()=>{
        const work=prompt("Enter the task")
        const stat="pending"
        setAct({Activity:work,Status:stat,Timetaken:0, Action: stat==="pending"?"start" : "end"})
        console.log(act.Activity)
        setActList([...actList, act])
        console.log(actList)
    }

    useEffect(()=>{
        let token=localStorage.getItem("Authorization")
        axios({
            url:"http://localhost:5000/uname",
            method:"get",
            headers:{
                authorization: token
            }
        }).then((res)=>{
            console.log(res.data.name)
            setUname(res.data.name)
        }).then((err)=>{
            console.log(err)
        })
    })
  return (
    <>
        <header>
            <h1>Todo List</h1>
            <h2>Hello!   {uname}</h2>
        </header>
        <aside><h3>To do List</h3></aside>
        <div className='activity' onClick={handleAdd}>Add New Activity</div>
        <div>
            <table border="1px">
                <th>
                    <td>Activity</td>
                    <td>Status</td>
                    <td>Time Taken</td>
                    <td>Action</td>
                </th>
                {actList.map((k,i)=>{
                    <tr key={i}>
                        <td>{k.Activity}</td>
                        <td>{k.Status}</td>
                        <td>{k.Timetaken}</td>
                        <td>{k.Action}</td>
                    </tr>
                })}
            </table>
        </div>
        <Logout></Logout>
    </>
  )
}

export default Todo