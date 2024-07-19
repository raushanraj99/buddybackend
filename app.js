const express = require("express")
const cookiesparser = require('cookie-parser');
const cors = require('cors');
const UserRouter = require("./router/user.js")
const dotenv = require('dotenv')
dotenv.config({
   path:'./data/config.env'
})

const app = express()
module.exports =app

// Middle ware 
app.use(express.json())
app.use(cookiesparser())
app.use(cors({
   origin:"http://localhost:5173",
   methods:["GET","POST","PUT","DELETE"],
   credentials:true
}))
// routes 
app.use('/users',UserRouter)
 

app.get("/",(req,res)=>{
   res.json({ 
      success:true,
      message:"Home page in app.js",
      token:req.cookies
   })
})
