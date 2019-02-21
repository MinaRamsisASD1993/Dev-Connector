const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserModel = new Schema({
  name: String,
  email: String,
  password: String,
  avatar: String,
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("User", UserModel, "users");
