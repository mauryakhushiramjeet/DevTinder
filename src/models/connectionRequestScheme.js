const mongoose = require("mongoose");
const connectionRequestScheme = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required:true
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required:true

    },
    status: {
      type: String,
      required:true,
      enum: {
        values: ["ignored", "accepeted", "rejected", "interested"],
        message: `{VALUE} is incorreact status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);
// connectionRequestScheme.pre("save",function(next){
//     const ConnectionRequestModele=this;
//     if(ConnectionRequestModele.fromUserId.equals(ConnectionRequestModele.toUserId)){
//         return res.status(400).json({ message: "Can't send connection request to YourSelf" }); // Changed to 400

//     }
//     next()
// })
connectionRequestScheme.index({fromUserId:1, toUserId:1})
const ConnectionRequestModele=new mongoose.model("ConnectionRequest",connectionRequestScheme)
module.exports={ConnectionRequestModele};