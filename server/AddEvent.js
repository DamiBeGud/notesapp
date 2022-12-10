const mongoose = require('mongoose')

const addEventSchema = new mongoose.Schema({
    user:String,
    title: String,
    description: String,
    time:String,
    date:String
})


module.exports = mongoose.model("AddEvent", addEventSchema)