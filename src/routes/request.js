const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const {ConnectionRequestModele} = require("../models/connectionRequestScheme");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const user = req.user; // Authenticated user
      const fromUserId = user._id; // ID of the user making the request
      const toUserId = req.params.toUserId; // ID of the user receiving the request
      const status = req.params.status; // Status of the request

      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status type" });
      }

      // Check if the recipient user exists
      const recipientUser = await User.findById(toUserId);
      if (!recipientUser) {
        return res.status(400).json({ message: "UserId doesn't exist" });
      }

      // Check for existing connection requests
      const existingConnectionRequest = await ConnectionRequestModele.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ]
      });
      
      if (fromUserId === toUserId) {
        return res.status(400).json({ message: "Can't send connection request to yourself" });
      }

      if (existingConnectionRequest) {
        return res.status(409).json({ message: "Connection request already exists" });
      }

      // Create a new connection request
      const connectionRequest = new ConnectionRequestModele({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save(); // Save the request

      // Respond with a success message
      return res.json({
        message: "Connection Request Sent Successfully",
        data,
      });

    } catch (err) {
      console.error(err); // Log the error for debugging
      return res.status(500).send(err.message); // Send error message
    }
  }
);

module.exports = requestRouter;
