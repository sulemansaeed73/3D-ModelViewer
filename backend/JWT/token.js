const jwt = require("jsonwebtoken");
require("dotenv").config();

// const token = req.headers.authorization.split(" ")[1];
function token(req, res, next) {
  
  const secret = req.cookies.admin;

  if (!secret) {
    return res.status(500).json({ message: "Authorization token missing" });
  }

  try {
    const decodedToken = jwt.verify(secret, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Invalid token" });
  }
}

module.exports = token;