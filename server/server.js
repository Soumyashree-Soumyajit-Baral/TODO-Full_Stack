require ('dotenv').config()
const express=require("express")
const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const cors=require("cors")
const bcrypt=require("bcrypt")
const app=express()
const signupModal=require("./modals/userinfo");
const {isUserExist, genPasswordHash}=require("./utility/utility")

const unProtected=["/login","/signup"]
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors());
app.use((req,res,next)=>{
    if(unProtected.includes(req.url)){
        next()
    }else{
        if(req.headers.authorization){
            jwt.verify(req.headers.authorization, process.env.SECRET_KEY, (err,uname)=>{
                if(err){
                    return res.sendStatus(403)
                }
                req.username=uname;
                next()
            })
        }else{
            res.send("Authorization required")
        }
    }
})


app.listen(process.env.PORT || 5000,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("server started")
    }
})

mongoose.connect("mongodb://localhost/todo", ()=>{
    console.log("connected to db")
}, (err)=>{
    console.log(err)
})



app.post("/signup",async (req,res)=>{
    if(await isUserExist(req.body.username)){
        // console.log(req.body.username)
        res.send("User is already present")
    }else{
        genPasswordHash(req.body.password).then((passwordHash)=>{
            signupModal.create({
                username:req.body.username,
                password:passwordHash
            })
            .then(()=>{
                res.send(`${req.body.username} added sucessfully`)
            }).catch((err)=>{
                res.send(err.message)
            })
        })
    }
})

app.post("/login",(req,res)=>{
    signupModal.find({username:req.body.username}).then((userData)=>{
        if(userData.length){
            bcrypt.compare(req.body.password, userData[0].password).then((val)=>{
                if(val){
                    const authToken= jwt.sign(userData[0].username, process.env.SECRET_KEY)
                    res.send({authToken})
                }else{
                    res.send("wrong password")
                }
            })
        }else{
            res.send("user not exist")
        }
    })
})

app.get("/uname",(req,res)=>{
    let name=req.username;
    res.send({name})
})
