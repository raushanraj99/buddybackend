const User = require("../model/user");
const bcrypt = require('bcrypt');
const { sendcookie } = require("../utils/features");

const register = async (req, res) => {
  
  try{
    const { name, email, password } = req.body;
    const user =await User.findOne({email})
    const hashedPassword = await bcrypt.hash(password,10)
    if(user){
      res.status(400).json({
        success:"sucess",
        message:"Email is already registered"
      })
    }
    else{
      await User.create({ 
        name,
        email,
        password:hashedPassword,
        });
       sendcookie(user,res,"registeration sucessful",201);
    } 
  }
  catch(err){
      console.log("Failed to register",err);
  }
};

// post method for form 
const login= async (req,res)=>{
      try{
        const {email,password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
              success:true,
              message:"Login Failed, email is not registerd"
            })
        }
        const isMatch =await bcrypt.compare(password, user.password)
        if(!isMatch){
          return res.status(401).json({
            success:true,
            message:"password does not match"
          })
        }
        
        // token create : 
        console.log("login")
        sendcookie(user,res,"Logged in successfull",200);
      
      }catch(err){
          console.log("Error in login ",err);
      }
}

// get requirest
const userprofile =(req,res)=>{
  // const cookies = req.cookies;
  // console.log("user profile ",req.user._id);
  res.json({
    status:true,
    page:"Home page user profile",
    user:req.user
  })
}

//logout
const logout = (req,res)=>{
  try{    
       res.status(200).cookie("token",'', {
        expires: new Date(Date.now()),
        // secure:true,
      })
      .json({
        success:true,
        message:"Logged out successfully !!!",
      })
  
 
   
  }catch(err){
    console.log("Logout error ",err);
    // res.redirect('/');
  }
}

module.exports = { register,login ,logout,userprofile};
