const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    min: [4, "Password length too short."],
    type: String,
    required: true,
  },
  role: {
    enum: ["user", "admin"],
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("Users", UserSchema);
