const express = require('express')
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config({
   path:"./data/config.env"
})

//app
app.use(express.json())
app.use(cors({
   origin:process.env.FRONTEND_URL,
   methods:["GET","POST"],
   credentials:true
}))

// database connection
 
mongoose.connect(process.env.DB_URL,{
   dbName:"native",
})
.then(()=>{
   console.log('Database connected sucessfully');
})
.catch(()=>{
   console.log("Failed to connect to databse ");
})

// database models 
const schema = mongoose.Schema({
   username:{
      type:String,
   },
   email:{
      type:String,
   },
   password:{
      type:String
   }
})
const buddylist = mongoose.model("buddieslist",schema)



app.get("/",(req,res)=>{
   res.send("Home page");
})

app.post("/post", async (req,res)=>{
      const {username, email, password} = req.body;
      await buddylist.create({
         username:username,
         email:email,
         password:password
      })

      res.json({
        status:"Signup sucess",
        buddydata:{
         username:username,
         email:email,
         password:password
        }
      })
})

// check all users 
app.get("/post",async (req,res)=>{
   const buddy = await buddylist.find({});

 res.json({
   status:"sucess",
   buddy:buddy
 });

})


app.listen(process.env.PORT,()=>{
   console.log("server is running on the port :  ",process.env.PORT,);
})