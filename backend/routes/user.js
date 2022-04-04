import express from "express";
import { checkToken, checkAdmin, checkAuth } from "../middleware/checkAuth.js";
import { updateUser, getAllUsers, getOneUser } from "../controllers/user.js";

const router = express.Router();

// @route GET /
// @desc Get all user information
// @access Admin only
router.get("/", checkAdmin, getAllUsers);

// @route GET /
// @desc Get one user information
// @access Private
router.get("/:id", checkAuth, getOneUser);

// @route PUT /
// @desc Update user account information
// @access Private
router.put("/edit", checkToken, updateUser);

export default router;
