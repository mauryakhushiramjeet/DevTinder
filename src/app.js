const express = require("express");
const app = express();
const connetdb = require("./config/database");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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
