const findOrCreate = require("mongoose-findorcreate")
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  email: String,
  googleId:String,
  questions: [
    {
      question: String,
      answer: String,
    },
  ],
});
  
  // userSchema.plugin(findOrCreate)
  
  module.exports = new mongoose.model("User", userSchema);