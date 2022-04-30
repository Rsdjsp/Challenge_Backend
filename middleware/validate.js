const { jwt_secret } = require("../config");
const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies) {
    return res.status(403).json({
      status: "no auth",
      message: " A token is require for this process",
    });
  } else {
    try {
      req.user = jwt.decode(cookies.token, jwt_secret);
      return next();
    } catch (error) {
      return res.status(403).json({ message: "Token Expired", error: error });
    }
  }
};

module.exports = validateToken;
