
const mongoose = require("mongoose")

const loginSchema = new mongoose.Schema({
    email : {
        type : String , 
        required : [true , "Please enter you email"],
        unique : true,
        lowercase : true
    } , 
    password : {
        type : String , 
        required : [ true , 'Password atleast should contain alteast of 8 characters'],
    } , 
    role : {
        type : String,
        enum : ["admin"],
        default : 'admin'
    }
},{
    timestamps : true
})

module.exports = mongoose.model('users' , loginSchema)