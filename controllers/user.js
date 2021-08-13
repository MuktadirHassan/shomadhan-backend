const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const salt = process.env.SALT || 7;
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res, next) => {
  try {
    const userExists = await UserModel.find({ email: req.body.email });
    if (userExists.length >= 1) {
      res.json({
        status: "failed",
        message: "User already exists",
      });
    } else {
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
    }
  } catch (err) {
    res.json({
      status: "failed",
      message: err.message,
    });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    //   Check if user is registered
    const currentUser = await UserModel.find({ email: req.body.email });
    if (currentUser.length === 0) {
      return res.json({
        message: "Authentication Failed",
        code: "#001",
      });
    }
    // Check password
    const correctPassword = await bcrypt.compare(
      req.body.password,
      currentUser[0].password
    );
    if (correctPassword) {
      const userInfo = {
        user: {
          email: currentUser[0].email,
          uid: currentUser[0]._id,
          role: currentUser[0].role,
        },
      };
      const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res
        .json({
          userInfo,
          token,
          message: "Authentication success",
        })
        .status(200);
    }

    // If password is incorrect
    res.json({
      message: "Authentication Failed",
      code: "#003",
    });
  } catch (err) {
    res.status(422).json({
      message: "Authentication Failed",
      code: "#002",
    });
  }
};
