const jwt = require("jsonwebtoken");
const User = require("../model/user");

const isAuthenticated = async (req, res, next) => {

  const { token } = req.cookies;

  if (!token) {
    res.status(401).json({
      sucess: false,
      message: "No token is there login first",
    });
  } else {
    // const jwt_secret = "sleivsdkvlienvds";
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decode._id);
    next();
  }
};

module.exports = { isAuthenticated };
