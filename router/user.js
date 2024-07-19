const express = require("express");
const router = express.Router();


const { login, register,logout,userprofile } = require("../controller/user");
const { isAuthenticated } = require("../authentication/auth");


router.post("/register", register); 


router.post("/login",login);
router.get('/logout',logout)


router.get("/userprofile", isAuthenticated ,userprofile);   

module.exports = router;
 