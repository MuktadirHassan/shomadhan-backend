const router = require("express").Router();
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");
const salt = process.env.SALT || 7;

router.post("/register", async (req, res) => {
  try {
    const userExists = await UserModel.find({ email: req.body.email });
    if (userExists.length === 0) {
      const hash = await bcrypt.hash(req.body.password, salt);
      const newUser = new UserModel({
        email: req.body.email,
        password: hash,
        role: req.body.role,
      });
      const user = await newUser.save();
      res.json({
        user: user.email,
        status: "success",
        message: "User registered successfully",
      });
    } else {
      res.json({
        status: "failed",
        message: "User already exists",
      });
    }
  } catch (err) {
    res.json({
      status: "failed",
      message: err.message,
    });
  }
});

module.exports = router;
