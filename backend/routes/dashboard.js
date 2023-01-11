import express from "express";
import { checkAdmin } from "../middleware/checkAuth.js";
import { getTotalSales } from "../controllers/dashboard.js";

const router = express.Router();

// @route GET /orders
// @desc Get all orders
// @access Admin only
router.get("/", checkAdmin, getTotalSales);

export default router;
