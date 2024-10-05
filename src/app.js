const express = require("express");
const app = express();
const User = require("./models/user");
const connetdb = require("./config/database");

app.use(express.json());
app.post("/signup", async (req, res) => {
  // console.log(req.body);
  try {
    const user = new User(req.body);
    await user.save();
    res.send("user Added Successfully");
  } catch (err) {
    res.status(404).send(err.message);
  }
});

// app.post("/signup", async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     res.status(201).send({ message: "User created successfully" });
//   } catch (error) {
//     if (error.name === "ValidationError") {
//       // Handle validation errors like required, min, trim, etc.
//       res.status(400).send({ error: error.message });
//     } else if (error.code === 11000) {
//       // Handle unique constraint errors
//       res
//         .status(400)
//         .send({ error: "Duplicate value found. Email must be unique." });
//     } else {
//       // Handle other errors
//       res.status(500).send({ error: "Server error" });
//     }
//   }
// });

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (user.length === 0) {
      res.status(404).send("Something went wrong");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(404).send("user unavailable err in feed");
  }
});
app.delete("/user", async (req, res) => {
  const userId = req.body._id;
  try {
    const users = await User.findByIdAndDelete({ _id: userId });
    res.send("user succesfully deleted");
  } catch (err) {
    res.status(404).send("user  not delet err");
  }
});
app.patch("/user", async (req, res) => {

  try {
    const _id = req.body._id;
    const data = req.body;
    await User.findByIdAndUpdate(_id, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("user updated successfully")
    res.send("document updated");
  } catch (err) {
    res.status(404).send(err.message);
  }
});

connetdb()
  .then(() => {
    console.log("database connect succesfully");
    app.listen(8080, () => {
      console.log("server is created on port 8080....");
    });
  })
  .catch(() => {
    console.log("database not connected");
  });
