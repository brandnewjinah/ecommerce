import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_KEY,
    { expiresIn: "1d" }
  );
};

export const checkToken = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (authorization) {
    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_KEY, (error, user) => {
      if (error) res.status(403).json("Invalid token");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
};

export const checkAuth = (req, res, next) => {
  checkToken(req, res, () => {
    if (req.user._id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not authorized");
    }
  });
};
