const User = require("../model/user");
const bcrypt = require("bcrypt");
const { sendcookie } = require("../utils/features");
const nodemailer = require('nodemailer');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    const hashedPassword = await bcrypt.hash(password, 10);
    if (user) {
      res.status(400).json({
        success: "sucess",
        message: "Email is already registered",
      });
    } else {
      await User.create({
        name,
        email,
        password: hashedPassword,
      });
      sendcookie(user, res, "registeration sucessful", 201);
    }
  } catch (err) {
    console.log("Failed to register", err);
  }
};

// post method for form
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: true,
        message: "Login Failed, email is not registerd",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: true,
        message: "password does not match",
      });
    }

    // token create :
    // console.log("login")
    sendcookie(user, res, "Logged in successfull", 200);
  } catch (err) {
    console.log("Error in login ", err);
  }
};

// get requirest
const userprofile = (req, res) => {
  // const cookies = req.cookies;
  // console.log("user profile ",req.user._id);
  res.json({
    status: true,
    page: "Home page user profile",
    user: req.user,
  });
};

//logout
const logout = (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        // secure:true,
      })
      .json({
        success: true,
        message: "Logged out successfully !!!",
      });
  } catch (err) {
    console.log("Logout error ", err);
    // res.redirect('/');
  }
};

// get requirest to forget password
const resetpassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const user = await User.findOne({ email });

    const oldhasedPassword = await bcrypt.compare(oldPassword, user.password);

    if (user.email != email) {
      return res.status(401).json({
        success: true,
        message: "Enter the correct email",
      });
    } else {
      if (oldhasedPassword) {
        const newhasedpassword = await bcrypt.hash(newPassword, 10);
        await User.updateOne(
          { email: email },
          { $set: { password: newhasedpassword } }
        );
        return res.status(201).json({
          success: true,
          message: "Password updated successfully",
        });
      } else {
        return res.status(401).json({
          success: true,
          message: "Old password doesn't matched",
        });
      }
    }
  } catch (err) {
    console.log("servere failure at reset pass : ", err);
    res.status(400).json({
      success: true,
      messsage: "server failure to reset password",
    });
  }
};

// send email post request 
const sendEmail = async (req,res) =>{
  console.log("send email : req.body",req.body.email);
  const {email} = req.body;
  const user =await User.findOne({email});
  console.log("User email from db : ",user?.email);
  

  // otp generation
  const otp = Math.floor((Math.random()*(9990-1200)+1)+1200);

  res.status(201).json({
    success:true,
    message:"Mail sent successsful",
    otp:otp
  })
  
  // nodemailer

  // const transporter = nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  //   port: 587,
  //   secure: false, // Use `true` for port 465, `false` for all other ports
  //   auth: {
  //     user: "itsraushanraj99@gmail.com",
  //     pass: "neucxkimmyjatjey",
  //   },
  // });

  //   await transporter.sendMail({
  //     from: "itsraushanraj99@gmail.com",
  //     to: user?.email, 
  //     subject: "OTP for Account Reset at Native Buddy", 
  //     text: `Hello, ${user?.name} You have requested for the reset password please enter the Below OTP.  ${otp}`, 
  //     // html: `<b>${otp}</b>`, // html body
  // }).then((resp)=>{
  //   console.log("message sent successfully",resp.messageId);
  //   res.status(201).json({
  //     success:true,
  //     otp:otp,
  //     message:"Message sent sucessfully",

  //   })
  // }).catch((error)=>{
  //   console.log("Failed message sent !!",error.message);
  //   res.status(401).json({
  //     success:true,
  //     message:error.message
  //   })
  // })
}


const passwordupdate =async (req,res)=>{
  console.log("password update put request");
  const {email,newPassword} = req.body;

  const user = await User.findOne({ email });
  console.log("user : ",user)

  const hashedPassword = await bcrypt.hash(newPassword,10);

  
 
  await User.updateOne(
    { email: email },
    { $set: { password: hashedPassword } }
  );


  
  return res.status(201).json({
    success: true,
    message: "Password updated successfully",
  });


}


// post request to forget password

module.exports = { register, login, logout, userprofile, resetpassword,sendEmail,passwordupdate };
