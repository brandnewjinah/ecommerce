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

//create
router.post("/", checkToken, createOrder);
router.get("/:id", checkToken, getOneOrder);

// router.get("/find/:userId", getUserOrder);
// router.put("/:id", updateOrder);
// router.delete("/:id", deleteOrder);
// router.get("/", getAllOrders);

router.get("/user/:id", checkAuth, getUserOrders);

export default router;
