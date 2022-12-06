const express = require('express')
const { stringify } = require('querystring')
const mongoose = require('mongoose')
const User = require('./User')
const Register = require('./Register')


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
                res.json()

            }else{
                console.log('User already exists')
                res.json()
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

app.post('/', [loginRun], (req,res, next)=>{})

app.post('/register', [registerRun], (req, res, next)=>{})



app.listen(8080, ()=>{
    console.log(`Server is listening on port 8080....`)
})