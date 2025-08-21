const mongoose = require("mongoose")

const agentSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : [true , "Please add an username"],
        trim : true
    } , 
    email : {
        type : String, 
        required : [true , "Please add an email"], 
        unique : true,
        lowercase : true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    } , 
    mobile : {
        type : String, 
        required : true,
        unique:true,
        match:[(/^\+?[1-9]\d{9,14}$/), "Mobile must be 10 digits"]
    } , 
    password : {
        type : String,
        required : true,
        minlenght: 8
    } , 
    taskLists : [
           {
        firstname: {
          type: String,
          required: true,
          trim: true,
        },
        mobile: {
          type: String,
          required: true,
        },
        note: {
          type: String,
          default: "",
        },
      },
    ]
}, {
    timestamps : true
})

module.exports = mongoose.model('agents',agentSchema)