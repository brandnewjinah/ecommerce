import express from "express";
import { checkAuth, checkToken } from "../middleware/checkAuth.js";
import {
  createOrder,
  getOneOrder,
  getUserOrders,
  updateOrder,
  deleteOrder,
  getUserOrder,
  getAllOrders,
} from "../controllers/order.js";

const router = express.Router();

// @route POST /orders
// @desc Create a new order
// @access Private
router.post("/", checkToken, createOrder);

// @route GET /orders/${id}
// @desc Get order detail for a single order
// @access Private
router.get("/:id", checkToken, getOneOrder);

// @route GET /orders/user/${userId}
// @desc Get all orders placed by a user
// @access Private
router.get("/user/:id", checkAuth, getUserOrders);

// router.get("/find/:userId", getUserOrder);
// router.put("/:id", updateOrder);
// router.delete("/:id", deleteOrder);
// router.get("/", getAllOrders);

export default router;
