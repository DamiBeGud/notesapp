const express = require('express')
const mongoose = require('mongoose')

const User = require('./User')
const Register = require('./Register')
const NewPost = require('./NewPost')
const AddEvent = require('./AddEvent')



const app = express()

app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/')



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
        const newPost = new NewPost({user: userId.userId,title:data.title, text:data.text, date:data.date})
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
        const userData = await Register.find({_id:userId.userId})
        const response = {articles, userData}
        // console.log(response)
        // console.log(articles)
        console.log('Get request was successful')
        res.json(response)
    } catch (error) {
        console.log(error.message)
        res.json(error.message)
    }
    next()
}

const articleDelete = async (req,res,next) =>{
    const deleteId = req.params
    console.log(deleteId)
    try {
        const deleteArticle = await NewPost.deleteOne({_id:deleteId.articleId})
        console.log(deleteArticle)
        res.json(true)
    } catch (error) {
        console.log(error.message)
    }
    
    next()
}

const editPost = async (req,res,next)=>{
    const data = req.body

    try {
        
        await NewPost.updateOne({_id:data._id}, {$set:{title:data.title, text:data.text}})
        console.log(data._id)
        res.json(true)
    } catch (error) {
        console.log(error.message)
        res.json(false)
    }
    next()
}

const addEvent = async(req,res,next) =>{
    const data = req.body
    try {
        const addNewEvent = new AddEvent(
            {
                title:data.title,
                 time:data.time,
                  description:data.description,
                  date:data.date,
                  user:data.user
                }
            )
        await addNewEvent.save()
        console.log(data)
        res.json(true)
        
    } catch (error) {
        console.log(error.message)
    }
    next()
}

const getEvents = async(req,res,next)=>{
    const {userId} = req.params
    try {
        const findEvents = await AddEvent.find({user:userId})
        res.json(findEvents)
    } catch (error) {
        console.log(error.message)
    }
    next()
}

const deleteEvent = async(req,res,next)=>{
    const {eventId} = req.params
    try {
        await AddEvent.deleteOne({_id: eventId})
        res.json(true)
        
    } catch (error) {
        console.log(error.message)
        res.json(error.message)
    }
    next()
}
const updateEvent = async(req,res,next) =>{
    const {eventId} = req.params
    const data = req.body
    try {
        await AddEvent.updateOne({_id: eventId},
            {$set:
                {
                    title:data.title,
                     time:data.time,
                      description:data.description
                    }})
                    
        res.json(true)
        
    } catch (error) {
        console.log(error.message)
        res.json(error.message)
    }
    next()
}

app.post('/updateevent/:eventId',[updateEvent],(req,res,next)=>{})

app.post('/deleteevent/:eventId',[deleteEvent],(req,res,next)=>{})

app.get('/events/:userId',[getEvents], (req,res,next)=>{})

app.post('/addevent',[addEvent],(req,res,next)=>{})

app.post('/edit',[editPost],(req,res,next)=>{})

app.post('/', [loginRun], (req,res, next)=>{})

app.post('/register', [registerRun], (req, res, next)=>{})

app.post('/user/:userId',[newPost],(req,res,next)=>{})

app.get('/user/:userId',[articlesRun],(req,res, next)=>{})

app.post('/delete/:articleId',[articleDelete],(req,res,next)=>{})   
app.listen(8080, ()=>{
    console.log(`Server is listening on port 8080....`)
})