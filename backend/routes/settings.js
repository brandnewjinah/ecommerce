import express from "express";
import { checkAdmin } from "../middleware/checkAuth.js";
import { addCategory, getAllCategories } from "../controllers/settings.js";

const router = express.Router();

// @route POST /category
// @desc Add category
// @access Admin only
router.post("/category", checkAdmin, addCategory);

// @route GET /category
// @desc Get category
// @access Admin only
router.get("/category", checkAdmin, getAllCategories);

export default router;
