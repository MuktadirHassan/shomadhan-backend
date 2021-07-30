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
    req.verified = verified;
    next();
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
    console.log(verified.user.role);
    if (verified.user.role === "admin") {
      req.verified = verified;
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
