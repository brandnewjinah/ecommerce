import express from "express";
import { checkAdmin } from "../middleware/checkAuth.js";
import {
  addCategory,
  getAllCategories,
  getACategory,
  addSubCategory,
  updateCategory,
} from "../controllers/settings.js";

const router = express.Router();

// @route POST /category
// @desc Add category
// @access Admin only
router.post("/category", checkAdmin, addCategory);

// @route GET /category
// @desc Get category
// @access Admin only
router.get("/category", checkAdmin, getAllCategories);

// @route GET /category/${id}
// @desc Get category details
// @access Admin only
router.get("/category/:id", checkAdmin, getACategory);

// // @route PATCH /category/${id}
// // @desc Edit category
// // @access Admin only
router.patch("/category/add/:id", checkAdmin, addSubCategory);

// @route PATCH /category/${id}
// @desc Update category
// @access Admin only
router.patch("/category/:id", checkAdmin, updateCategory);

export default router;
