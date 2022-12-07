const express = require('express')
const { stringify } = require('querystring')
const mongoose = require('mongoose')
const User = require('./User')
const Register = require('./Register')
const NewPost = require('./NewPost')


const app = express()

app.use(express.json())

mongoose.connect('mongodb://localhost:27017/test')



const registerRun = async (req, res, next) =>{
    const data = req.body
    
    try{
        
        const userExistst = await Register.find({email: req.body.email})
            if(userExistst.length === 0){
                
                const register =  new Register({name: data.name,email:data.email,password:data.password})
                await register.save()
                console.log('user added')
                res.json(true)

            }else{
                console.log('User already exists')
                res.json(false)
            }
    }catch (e){
        console.log(e.message)
    }

    next()
}

const loginRun = async (req, res, next)=>{
    const data = req.body
    const {email, password} = data
    try {
        const login = await Register.find({email: email, password:password})
        
        if(login.length === 0){
            console.log('Ur password or email is wrong')
            const response = {success:false} 
            res.json(response)
            next()
        }else{
            console.log(login)
            const response = {success:true, url:login[0]._id} 
            res.json({response})
            next()

        }
    } catch (error) {
        console.log(error.message)
    }
}

const newPost = async (req, res, next) =>{
    const  userId  = req.params
    const data = req.body
    try {
        const newPost = new NewPost({user: userId.userId,title:data.title, text:data.text})
        await newPost.save()
        res.json(true)
    } catch (error) {
        console.log(error.message)
        res.json(false)
    }
    next()
}

const articlesRun = async (req, res, next)=>{
    const userId = req.params
    console.log(req.params)
    try {
        const articles = await NewPost.find({user:userId.userId})
        // console.log(articles)
        console.log('Get request was successful')
        res.json(articles)
    } catch (error) {
        console.log(error.message)
        res.json(error.message)
    }
    next()
}

app.post('/', [loginRun], (req,res, next)=>{})

app.post('/register', [registerRun], (req, res, next)=>{})

app.post('/user/:userId',[newPost],(req,res,next)=>{

})
app.get('/user/:userId',[articlesRun],(req,res, next)=>{
    
    
})
app.listen(8080, ()=>{
    console.log(`Server is listening on port 8080....`)
})