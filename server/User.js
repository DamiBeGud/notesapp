const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    name:String,
    age:Number,
    // 'strictQuery': true
})


module.exports = mongoose.model("User", userSchema)