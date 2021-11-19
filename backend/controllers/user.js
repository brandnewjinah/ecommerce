import User from "../models/user.js";
import CryptoJS from "crypto-js";
import { generateToken } from "../middleware/checkAuth.js";

//update
export const updateUser = async (req, res) => {
  try {
    if (req.body.password === "") {
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
          },
        },
        { new: true }
      );
      const token = generateToken(updatedUser);
      const { password, ...others } = updatedUser._doc;
      res.status(200).json({ ...others, token });
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
              req.body.password,
              process.env.SECRET_KEY
            ).toString(),
          },
        },
        { new: true }
      );
      const token = generateToken(updatedUser);
      const { password, ...others } = updatedUser._doc;
      res.status(200).json({ ...others, token });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//GET ALL USERS
export const getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * pageSize;

  try {
    let users = User.find();
    const total = await User.countDocuments();
    const pages = Math.ceil(total / pageSize);
    users = users.skip(skip).limit(pageSize);
    const result = await users;
    res.status(200).json({
      status: "success",
      count: result.length,
      page,
      pages,
      data: result,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
