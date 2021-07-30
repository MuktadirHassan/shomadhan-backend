const jwt = require("jsonwebtoken");

// {
//     user: {
//       email: 'test@gmail.com',
//       uid: '6102f2dc1cca8732648dd750',
//       role: 'user'
//     },
//     iat: 1627646886,
//     exp: 1627650486
//   }
module.exports.verifyUser = async (req, res, next) => {
  try {
    const verified = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    next();
  } catch (err) {
    res.json({
      message: "Authentication Failed",
      code: "#004",
    });
  }
};
module.exports.verifyCurrentUser = async (req, res, next) => {
  try {
    const verified = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    if (verified.user.uid === req.params.uid) {
      next();
    } else {
      res
        .json({
          message: "Permission Denied. You are not the author of this post.",
        })
        .status(403);
    }
  } catch (err) {
    res.json({
      message: "Authentication Failed",
      code: "#004",
    });
  }
};
module.exports.verifyAdmin = (req, res, next) => {
  try {
    const verified = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    if (verified.user.role === "admin") {
      next();
    } else {
      res
        .json({
          message: "Permission Denied",
        })
        .status(403);
    }
  } catch (err) {
    res.json({
      message: "Authentication Failed",
      code: "#004",
    });
  }
};
