const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minLength: 5,
  },
  lastName: {
    type: String,
  },
  GmailId: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Age: {
    type: Number,
    min: 18,
  },
  Gender: {
    type: String,
    enum: {
      values: ["male", "female", "others"],
      message: `{VALUE} is not valide gener type`,
    },
  },
  PhotoUrl: {
    type: String,
  },
  Skills: {
    type: [String],
  },
  About: {
    type: String,
    default: "this is default value",
  },
},{
timestamps:true
});

// Method to generate JWT token
// userSchema.methods.getjwt = async function () {
//   const user = this;
//   const token = await jwt.sign({ _id: user._id }, "Sejal@123", {
//     expiresIn: "7d",
//   });
//   return token;
// };
userSchema.methods.getjwt = async function () {
  const user = this; // Reference to the current user instance
  const token = await jwt.sign(
    { _id: user._id }, // Payload containing user ID
    "Ankit@123", // Secret key to sign the token
    { expiresIn: "7d" } // Options for the token (7 days expiration)
  );
  return token; // Returns the signed token
};

// Method to validate user password
userSchema.methods.validatPassword = async function (passwordInputByUser) {
  const user = this; // Reference to the current user instance
  const passwordHash = user.Password; // Get the hashed password
  return await bcrypt.compare(passwordInputByUser, passwordHash); // Compare with the hashed password
};

// Creating the user model
const userModel = mongoose.model("Mongodev", userSchema);
module.exports = userModel;
