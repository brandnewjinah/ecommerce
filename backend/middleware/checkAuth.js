const jwt = require("jsonwebtoken");

module.exports = () => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secret");
    req.userData = decoded;
    console.log(req);
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authentication failed",
    });
  }
};
