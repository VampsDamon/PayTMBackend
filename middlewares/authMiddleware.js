const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const authMiddleware = (req, res, next) => {
  try {
    const authHeaders = req.headers.authorization;

    if (!authHeaders || !authHeaders.startsWith("Bearer")) {
      throw new Error("Authorization headers must be provided");
    }
    const token = authHeaders.split(" ")[1];
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (verifiedToken.userId) {
      req.userId = verifiedToken.userId;
      next();
    } else throw new Error("Token is not valid");
  } catch (error) {
    return res.status(403).json({
      message: "Authorization Failed",
      error: error.message,
    });
  }
};

module.exports = authMiddleware;
