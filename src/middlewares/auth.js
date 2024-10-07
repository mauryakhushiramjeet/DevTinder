const jwt = require("jsonwebtoken");
const User=require("../models/user");
const { request } = require("express");

const userAuth = (req, res, next) => {
    const token = req.cookies.token; // If you're using cookies

    if (!token) {
        return res.status(401).send("Access Denied: No token provided");
    }

    try {
        // Use the same secret as when signing the token
        const verified = jwt.verify(token, "Ankit@123"); // Ensure the secret matches
        req.user = verified; // Attach verified user data to the request
        next(); // Call next middleware or route handler
    } catch (error) {
        console.error("Token verification error:", error); // Log the error for debugging
        res.status(400).send("Invalid Token"); // Send response for invalid token
    }
};


module.exports={userAuth}
