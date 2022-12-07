const mongoose = require('mongoose')

const newPostSchema = new mongoose.Schema({
    user:String,
    title: String,
    text: String
})


module.exports = mongoose.model("NewPost", newPostSchema)