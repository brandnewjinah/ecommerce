const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//signup
exports.user_signup = (req, res) => {
  const { name, email, password } = req.body;

  userModel
    .findOne({ email })
    .then((user) => {
      if (user) {
        //error message
        return res.status(400).json({
          error: "Email is already being used",
        });
      } else {
        //hash password
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            //save
            const user = new userModel({
              name,
              email,
              password: hash,
            });

            user
              .save()
              .then((user) => {
                res.status(200).json({
                  message: "User registered",
                  userInfo: user,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      res.json({
        message: err.message,
      });
    });
};

// login

exports.user_login = (req, res) => {
  const { email, password } = req.body;

  userModel
    .findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          message: "Not a registered user",
        });
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err || result === false) {
            return res.status(400).json({
              message: "Incorrect password",
            });
          } else {
            const token = jwt.sign(
              { userId: user._id, email: user.email },
              "secret",
              { expiresIn: "1d" }
            );
            res.status(200).json({
              message: "User logged in",
              token: token,
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
