import User from "../models/user.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { generateToken } from "../middleware/checkAuth.js";

//signup
export const signup = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser)
      return res
        .status(400)
        .json({ message: "User already exists with that email" });

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
    });

    const token = generateToken(newUser);

    const { password, ...others } = newUser._doc;

    res.status(200).json({ ...others, token });
  } catch (error) {
    res.status(500).json(error);
  }
};

//signin
export const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json("User does not exist with this email");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    );
    const savedPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    savedPassword !== req.body.password &&
      res.status(400).json("Wrong password");

    const token = generateToken(user);
    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, token });
  } catch (error) {
    res.status(500).json(error);
  }
};
