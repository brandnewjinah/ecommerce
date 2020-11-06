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
              { userId: user._id, email: user.email, name: user.name },
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

//get all user list
exports.user_all = (req, res) => {
  userModel
    .find()
    .then((users) => {
      res.json({
        message: "All users",
        count: users.length,
        users: users.map((user) => {
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            request: {
              type: "GET",
              url: "http://localhost:5000/user/" + user._id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.json({
        message: err.message,
      });
    });
};

//get user detail
exports.user_each = (req, res) => {
  const id = req.params.userId;
  userModel
    .findById(id)
    .then((user) => {
      if (user) {
        res.status(200).json({
          message: "User info for the provided ID",
          userInfo: {
            id: user._id,
            name: user.name,
            email: user.email,
            request: {
              type: "GET",
              url: "http://localhost:5000/user/",
            },
          },
        });
      } else {
        res.status(404).json({
          message: "User not found with the provided ID",
        });
      }
    })
    .catch((err) => {
      res.json({
        message: err.message,
      });
    });
};

//update user
exports.user_update = (req, res) => {
  const id = req.params.userId;

  userModel
    .findByIdAndUpdate(id, { $set: req.body })
    .then((result) => {
      res.json({
        message: "User updated",
        request: {
          type: "GET",
          url: "http://localhost:5000/user/" + id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
