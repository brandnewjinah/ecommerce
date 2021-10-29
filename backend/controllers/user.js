import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

//signin
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email }); //see if user exists
    if (!existingUser)
      return res.status(404).json({ message: "User doens't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//Signup
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res
        .status(400)
        .json({ message: "User already exists with thie email" });

    const hashPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      name,
      email,
      password: hashPassword,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// googlelogin
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT);
// exports.user_googlelogin = (req, res) => {
//   const { idToken } = req.body;

//   client
//     .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT })
//     .then((res) => {
//       const { email_verified, name, email } = response.payload;

//       if (email_verified) {
//         User.findOne({ email }).exec((err, user) => {
//           if (user) {
//             const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
//               expiresIn: "7d",
//             });

//             return res.json({
//               token,
//               user,
//             });
//           } else {
//             let password = email + process.env.SECRET_KEY;
//             user = new userModel({ name, email, password });
//             user.save((err, data) => {
//               if (err) {
//                 return res.status(400).json({
//                   error: "user signup failed with gogole",
//                 });
//               }
//               const token = jwt.sign(
//                 { _id: data._id },
//                 process.env.SECRET_KEY,
//                 { expiresIn: "7d" }
//               );
//               return res.status(200).json({
//                 token,
//                 user: data,
//               });
//             });
//           }
//         });
//       } else {
//         return res.status(400).json({
//           error: "Google login failed. Try again",
//         });
//       }
//     });
// };

//get all user list
// exports.user_all = (req, res) => {
//   User.find()
//     .then((users) => {
//       res.json({
//         message: "All users",
//         count: users.length,
//         users: users.map((user) => {
//           return {
//             id: user._id,
//             name: user.name,
//             email: user.email,
//             request: {
//               type: "GET",
//               url: "http://localhost:5000/user/" + user._id,
//             },
//           };
//         }),
//       });
//     })
//     .catch((err) => {
//       res.json({
//         message: err.message,
//       });
//     });
// };

//get user detail
// exports.user_each = (req, res) => {
//   const id = req.params.userId;
//   User.findById(id)
//     .then((user) => {
//       if (user) {
//         res.status(200).json({
//           message: "User info for the provided ID",
//           userInfo: {
//             id: user._id,
//             name: user.name,
//             email: user.email,
//             request: {
//               type: "GET",
//               url: "http://localhost:5000/user/",
//             },
//           },
//         });
//       } else {
//         res.status(404).json({
//           message: "User not found with the provided ID",
//         });
//       }
//     })
//     .catch((err) => {
//       res.json({
//         message: err.message,
//       });
//     });
// };

//update user
// exports.user_update = (req, res) => {
//   const id = req.params.userId;

//   User.findByIdAndUpdate(id, { $set: req.body })
//     .then((result) => {
//       res.json({
//         message: "User updated",
//         request: {
//           type: "GET",
//           url: "http://localhost:5000/user/" + id,
//         },
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         error: err,
//       });
//     });
// };
