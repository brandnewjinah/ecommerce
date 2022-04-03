import express from "express";
import { checkAdmin } from "../middleware/checkAuth.js";
import {
  getProducts,
  getAProduct,
  getSimilarProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  deleteManyProducts,
} from "../controllers/products.js";

const router = express.Router();

// @route GET /products
// @desc View all products
// @access Public
router.get("/", getProducts);

// @route GET /products/${id}
// @desc View product details
// @access Public
router.get("/:id", getAProduct);

// @route GET /products/similar/${id}
// @desc View product details
// @access Public
router.get("/similar/:id", getSimilarProducts);

// @route POST /products
// @desc Add product
// @access Admin only
router.post("/", checkAdmin, addProduct);

// @route PATCH /products/${id}
// @desc Update product
// @access Admin only
router.patch("/:id", checkAdmin, updateProduct);

// @route DELETE /products/${id}
// @desc Delete product
// @access Admin only
router.delete("/:id", checkAdmin, deleteProduct);

// @route PATCH /products
// @desc Delete many products
// @access Admin only
router.patch("/", checkAdmin, deleteManyProducts);

export default router;
