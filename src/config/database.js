const mongoose = require("mongoose");
const connetdb = async () => {
  await mongoose.connect("mongodb://localhost:27017/Mongodevtinder");
};
module.exports = connetdb;
