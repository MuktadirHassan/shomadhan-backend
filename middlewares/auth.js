const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
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
