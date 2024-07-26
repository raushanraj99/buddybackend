const express = require("express");
const router = express.Router();


const { login, register,logout,userprofile,resetpassword,sendEmail,passwordupdate } = require("../controller/user");
const { isAuthenticated } = require("../authentication/auth");


router.post("/register", register); 


router.post("/login",login);
router.get('/logout',logout);
router.post('/resetpassword/:id',isAuthenticated,resetpassword)
// forget password,  send email 
router.post("/sendemail",sendEmail);
// forgate password,  password update 
router.put("/password_update",passwordupdate)

router.get("/userprofile", isAuthenticated ,userprofile);   

module.exports = router;
 