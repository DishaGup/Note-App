const mongoose=require("mongoose")

const registerSchema=mongoose.Schema({
    name :{ type: String, required: true } ,
    email :{ type: String, required: true ,lowercase: true} ,
    age :{ type: Number},
    password :{ type: String, required: true } 
})

const RegisterModel=mongoose.model("above-register",registerSchema)

module.exports={
    RegisterModel
}