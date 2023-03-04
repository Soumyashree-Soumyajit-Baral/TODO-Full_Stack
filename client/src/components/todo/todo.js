import React from 'react'

import { useState, useEffect } from "react"
import axios from 'axios'
import Logout from '../logout/logout'
import "./todo.css"

function Todo() {
    const [uname, setUname] = useState("")
    const [actList, setActList] = useState([])
    const refresh = () => {
        window.location.reload(false);
    }
    const handleEdit = (id) => {
        const token = localStorage.getItem("Authorization")
        const work = prompt("Enter the task")
        console.log(work)
        axios({
            url: `http://localhost:5000/edit/${id}`,
            method: "put",
            headers: {
                authorization: token
            },
            data: {
                task: work
            }
        }).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
        setTimeout(() => {
            window.location.reload(false);
        }, 10);
    }
    const deletesingle = (id) => {
        let data = [id];
        let token = localStorage.getItem("Authorization");
        axios({
            method: "DELETE",
            url: "http://localhost:5000/delete",
            headers: {
                authorization: token,
            },
            data: {
                deleteitems: data,
            },
        });
        setTimeout(() => {
            window.location.reload(false);
        }, 10);
        alert("task will be deleted !")
    };
    const handleAdd = () => {
        const work = prompt("Enter the task")
        let token = localStorage.getItem("Authorization")
        axios({
            url: "http://localhost:5000/addtodo",
            method: "post",
            headers: {
                authorization: token
            },
            data: {
                task: work
            }
        }).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err.message)
        })
        setTimeout(() => {
            window.location.reload(false);
        }, 10);
    }

    useEffect(() => {
        // if(!localStorage.getItem("name")){
        //     navigate("/")
        // }else{
        //     setUname(localStorage.getItem("name"))
        // }
        let token = localStorage.getItem("Authorization")
        // let name=localStorage.getItem("name")

        // console.log(token)
        axios({
            url: "http://localhost:5000/uname",
            method: "get",
            headers: {
                authorization: token
            }
        }).then((res) => {
            setUname(res.data.name.toUpperCase())
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    useEffect(() => {
        let token = localStorage.getItem("Authorization")

        axios({
            url: "http://localhost:5000/alltasks",
            method: "get",
            headers: {
                authorization: token
            }
        }).then((res) => {
            // console.log(res.data)
            setActList([...res.data])
            // console.log(actList)
        }).catch((err) => {
            console.log(err)
        })

    }, [])

    // useEffect(()=>{
    //     let token=localStorage.getItem("Authorization")
    //     try{
    //         async function fetchUname(){
    //             let data=await axios({
    //                 url:"http://localhost:5000/uname",
    //                 method:"get",
    //                 headers:{
    //                     authorization: token
    //                 }
    //             })
    //             return data;
    //         }
    //         let udata=fetchUname()
    //         setUname(udata)
    //     }catch(err){
    //         console.log(err)
    //     }
    // },[])
    return (
        <>

            <header>
                <h1>Todo List</h1>
                <h2>Hello!   {uname}</h2>
            </header>
            <aside>
                <h3 className="rfs" onClick={refresh}>Show To do List</h3>
            </aside>
            <div className='activity' onClick={handleAdd}>Add New Activity</div>

            <div>
                <table border="1px">
                    <thead>
                        <tr>
                            <th>Activity</th>
                            <th>Action 1</th>
                            <th>Action 2</th>
                        </tr>
                    </thead>

                    {actList.length > 0 ? actList.map((k, i) => {
                        return (<tbody key={i}>
                            <tr>
                                <td>{k.task}</td>
                                <td>
                                    <button onClick={() => handleEdit(k._id)}>Edit</button>
                                </td>
                                <td>
                                    <button onClick={() => deletesingle(k._id)}>Delete</button>
                                </td>
                            </tr>
                        </tbody>)

                    }) : ""}
                </table>
            </div>
            <Logout></Logout>
        </>
    )
}

export default Todo