const express = require("express");
const { userAuth } = require("../middlewares/auth");
const profileRouter = express.Router();
const User = require("../models/user");
const { validateEditeProfileData } = require("../utills/validation");
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const fullUser = await User.findById(user._id);
    console.log(fullUser);
    if (!fullUser) {
      throw new Error("invalid user");
    }
    res.send(fullUser);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

profileRouter.patch("/profile/edite", userAuth, async (req, res) => {
  try {
    // Validate edit fields
    if (!validateEditeProfileData(req)) {
      return res.status(400).send("Invalid user request Fields");
    }

    // Fetch the full user profile from the database using the ID from JWT
    const loggedInUser = await User.findById(req.user._id);

    if (!loggedInUser) {
      return res.status(404).send("User not found");
    }

    // Update the fields that are present in req.body
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    // Save the updated user
    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfully'`,
      data: loggedInUser,
    }); // Send success message
  } catch (err) {
    res.status(500).send(err.message); // Internal Server Error
  }
});
// profileRouter.patch("/profile/password", async (req, res) => {
//   try {
//     const userId = req.user.id; // assuming authenticated user
//     const { oldPassword, newPassword } = req.body;

//     const user = await User.findById(userId);

//     // Verify the old password
//     const isMatch = await bcrypt.compare(oldPassword, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: "Incorrect old password" });
//     }

//     // Hash the new password and save
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;
//     await user.save();

//     res.status(200).json({ message: "Password updated successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to update password." });
//   }
// });

module.exports = profileRouter;
