import express from "express";
import { checkAuth, checkToken, checkAdmin } from "../middleware/checkAuth.js";
import {
  createOrder,
  getOneOrder,
  getUserOrders,
  getAllOrders,
} from "../controllers/order.js";

const router = express.Router();

// @route POST /orders
// @desc Create a new order
// @access Private
router.post("/", checkToken, createOrder);

// @route GET /orders/${userId}/${orderId}
// @desc Get order detail for a single order
// @access Private or Admin
router.get("/:userId/:orderId", checkAuth, getOneOrder);

// @route GET /orders/user/${userId}
// @desc Get all orders placed by a user
// @access Private or Admin
router.get("/user/:userId", checkAuth, getUserOrders);

// @route GET /orders
// @desc Get all orders
// @access Admin only
router.get("/", checkAdmin, getAllOrders);

export default router;
