import express from "express";
import { checkToken } from "../middleware/checkAuth.js";
import { updateUser } from "../controllers/user.js";

const router = express.Router();

// @route PUT /
// @desc Update user account information
// @access Private
router.put("/edit", checkToken, updateUser);

export default router;
