const express = require("express")
const { connection } = require("./Config/connection")
const app = express()
var cors = require('cors')
const jwt=require("jsonwebtoken")
const {  NotesRouter } =require("./Routes/notes.route")
const { registerRouter } = require("./Routes/register.route")
const { logger } = require("./looger.middleware")
require('dotenv').config()
app.use(cors())
app.use(express.json())
app.use("/user", registerRouter)


app.get("/home", (req, res) => {
    res.send("home Page")
})
app.use(logger)
app.use("/notes", NotesRouter)

app.get("/userdetails", (req, res) => {
    var {token}=req.query
jwt.verify(token,"masai", (err,decoded )=>{
if(err){
res.send("Invalid Token")
console.log(err)
} else {
res.send("User Detail Page")
}
})
    
})

//id=  7fe4c11851ea7c8f8fe8a
app.get("/home", (req, res) => {
    res.send("home Page")
})



app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("mongo connected")
    } catch (error) {
        console.log("mongo not connected")
        console.log(error)
    }
    console.log("server running at 8080")

})