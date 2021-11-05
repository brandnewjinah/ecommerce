import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

//update
export const updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
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
