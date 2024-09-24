const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const authMiddleware = (req, res, next) => {
  console.log("Auth Middleware")
  const authHeaders = req.headers.authorization;
  
  if (!authHeaders || !authHeaders.startsWith("Bearer")) {
   return  res.status(403).json({});
  }
  const token = authHeaders.split(" ")[1];
  try {
    const verifiedToken = jwt.verify(token, JWT_SECRET);
    if (verifiedToken.userId){
        req.userId = verifiedToken.userId;
        next();
    }
    else throw new Error("")
  } catch (error) {
    return res.status(403).json({});
  }
};

module.exports = authMiddleware;
