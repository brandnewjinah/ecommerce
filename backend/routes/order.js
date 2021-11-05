import express from "express";
import { checkToken } from "../middleware/checkAuth.js";
import {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrder,
  getAllOrders,
} from "../controllers/order.js";

const router = express.Router();

//create
router.post("/", checkToken, createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.get("/find/:userId", getUserOrder);
router.get("/", getAllOrders);

export default router;
