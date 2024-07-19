const jwt = require("jsonwebtoken");

const sendcookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user?._id }, process.env.JWT_SECRET);
//   console.log("token in features.js: ",token);
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      // secure:true
    })
    .json({
      success: true,
      message: message,
    });
};

module.exports = { sendcookie };
