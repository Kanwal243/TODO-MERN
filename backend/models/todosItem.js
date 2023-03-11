const mongoose = require('mongoose')

//Creating Schema
 
const todoItemSchema = new mongoose.Schema({
    item:{type:String,required:true}
})


module.exports = mongoose.model ('todo',todoItemSchema)