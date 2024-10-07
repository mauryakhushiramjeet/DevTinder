const express = require("express");
const authRouter = express.Router();
const { valideSignUpData } = require("../utills/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
authRouter.post("/signup", async (req, res) => {
    try {
      valideSignUpData(req);
      const { Password, firstName, lastName, GmailId } = req.body;
      const passwordHash = await bcrypt.hash(Password, 10);
      console.log(passwordHash);
      const user = new User({
        firstName,
        lastName,
        Password: passwordHash,
        GmailId,
      });

      await user.save();
      res.send("user Added Successfully");
    } catch (err) {
      res.status(404).send(err.message);
    }
  });

authRouter.post("/login", async (req, res) => {
    try {
        const { Password, GmailId } = req.body; // Ensure the property names match

        // Find user by GmailId
        const user = await User.findOne({ GmailId });
        if (!user) {
            return res.status(404).send("Invalid credentials");
        }

        // Use the validatPassword method to compare the passwords
        const isPasswordValid = await user.validatPassword(Password); // Make sure you're passing Password here

        if (isPasswordValid) {
            // Create token
            const token = await user.getjwt();
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000),
            });
            res.send("Login Successfully");
        } else {
            return res.status(400).send("Password is incorrect");
        }
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send("Internal Server Error");
    }
});
authRouter.post("/logOut" , async(req,res)=>{
  try{
    res.cookie("token",null,{
        expires:new Date (Date.now())
    })
    res.send("succesfully logout")
  }catch(err){
    res.send(err.message)
  }
})


module.exports = authRouter;
