const { mongoose } = require("mongoose")

const UserSchema = mongoose.Schema({
   name:{
      type:String,
   },
   email:String,
   password:String,
})


module.exports = mongoose.model("user",UserSchema)