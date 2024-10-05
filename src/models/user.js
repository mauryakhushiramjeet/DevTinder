const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength:5
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    lowercase:true,
    unique: true,
    trim:true
  },
  Password: {
    type: String,
    required: true,

  },
  Age: {
    type: Number,
    min:18
  },
  Gender: {
    type: String,
    validate(value){
      if(!["male","female","others"].includes(value)){
        throw new Error("user gender not validate")
        
      }
    }
  },
  PhotoUrl:{
    type:String
  },
  Skills:{
    type:[String]
  },
  About:{
    type:String,
  default:"this is default value"
  }
});
const userModel = mongoose.model("Mongodev", userSchema);
module.exports = userModel;
