const express=require('express')
const cors=require('cors')
const jwt=require('jsonwebtoken')
const middleware=require('./middleware')
const mongoose=require('mongoose')
const db=require('mongodb')
const app=express()
app.use(cors())
app.use(express.json())
mongoose.set('strictQuery',true)
mongoose.connect('mongodb+srv://PRATHAP:VEERA6543@cluster0.98yxf.mongodb.net/userDB?retryWrites=true&w=majority',()=>{console.log('connected')})
const userSchema=new mongoose.Schema({
    email:'String',
    password:'String',
    confirmPassword:'String'
})
const User=new mongoose.model('User',userSchema)
app.get('/login',(req,res)=>{
    res.send('login page')
})
app.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body
        const exist=await User.findOne({"email":email})
        if(!exist){
            return res.send('User not found')
        }
        if(password!=exist.password){
            return res.send('Password is not matching')
        }
        let payload={
            user:{
                id:exist.id
            }
        }
        jwt.sign(payload,'jwtSecrete',{expiresIn:600000},(err,token)=>{
            if(err) return res.send(err)
            return res.json({token})
        })
    }
    catch(err){
        return res.send(err)
    }
})

app.get('/',(req,res)=>{
    res.send('<h1>Hello World</h1>')
})
app.post('/register',async(req,res)=>{
    try{
        const {email,password,confirmPassword}=req.body
        const exist=await User.findOne({emai})
        if(exist){
            return res.send('Email already taken')
        }
        if(password!=confirmPassword){
            return res.send('password and confirmpassword not matching')
        }
        else{
            const user=new User({
                email:email,
                password:password
            })
            user.save()
            return res.send('user created successfully')
        }
    }
    catch(err){
        return res.send(err)
    }
    
})
app.listen(8081,()=>{
    console.log('server running at port 8081');
})