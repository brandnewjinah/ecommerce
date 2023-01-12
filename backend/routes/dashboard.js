import express from "express";
import { checkAdmin } from "../middleware/checkAuth.js";
import { getTotalSales, getTopSelling } from "../controllers/dashboard.js";

const router = express.Router();

// @route GET /total
// @desc Get total orders
// @access Admin only
router.get("/total", checkAdmin, getTotalSales);

// @route GET /top
// @desc Get top selling
// @access Admin only
router.get("/top", checkAdmin, getTopSelling);

export default router;
