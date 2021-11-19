import express from "express";
import { checkToken } from "../middleware/checkAuth.js";
import { updateUser, getAllUsers } from "../controllers/user.js";

const router = express.Router();

// @route GET /
// @desc Get all user information
// @access Private
router.get("/", getAllUsers);

// @route PUT /
// @desc Update user account information
// @access Private
router.put("/edit", checkToken, updateUser);

export default router;
