import React from 'react'

import { useState, useEffect , useLayoutEffect} from "react"
// import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logout from '../logout/logout'
import "./todo.css"

function Todo() {
    // const navigate = useNavigate()
    const [uname, setUname] = useState("")
    // const [act, setAct] = useState({})
    const [actList, setActList] = useState([])
    const authtoken = localStorage.getItem("Authorization")
    const refresh=()=>{
        window.location.reload(false);
    }
    const handleEdit = (id) => {
        const token = localStorage.getItem("Authorization")
        const work= prompt("Enter the task")
        console.log(work)
        axios({
            url: `http://localhost:5000/edit/${id}`,
            method: "put",
            headers: {
                authorization: token
            },
            data: {
                task:work
            }
        }).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
        setTimeout(() => {
            window.location.reload(false);
        }, 100);
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
        }, 1000);
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
        }, 100);
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
                authorization:token
            }
        }).then((res) => {
            setUname(res.data.name)
        }).catch((err) => {
            console.log(err)
        })
        // setTimeout(() => {
        //     window.location.reload(false);
        //   }, 1000);
    }, [])
    useEffect(() => {
        let token =  localStorage.getItem("Authorization")
        console.log(token)
        axios({
            url: "http://localhost:5000/alltasks",
            method: "get",
            headers: {
                authorization:token
            }
        }).then((res) => {
            console.log(res.data,token)
            // setTimeout(()=>{
            //     setActList([...res.data])
            // },100)
            setActList([...res.data])
        }).catch((err) => {
            console.log(err)
        })
        // setTimeout(() => {
        //     window.location.reload(false);
        //   }, 1000);
        // window.location.reload(false);
    }, [])
    // useEffect(()=>{
    //     setTimeout(() => {
    //             window.location.reload(false);
    //           }, 1000); 
    // },[])
    

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
                    {actList.map((k, i) => {
                        if(k.task){
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
                        }
                        
                    })}
                </table>
            </div>
            <Logout></Logout>
        </>
    )
}

export default Todo