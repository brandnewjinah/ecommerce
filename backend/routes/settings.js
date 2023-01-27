import express from "express";
import { checkAdmin } from "../middleware/checkAuth.js";
import {
  addCategory,
  getAllCategories,
  getACategory,
  addSubCategory,
  deleteSubCategory,
  updateCategory,
  addBrand,
  getAllBrands,
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

// @route PATCH /category/${id}
// @desc Update category
// @access Admin only
router.patch("/category/:id", checkAdmin, updateCategory);

// @route PATCH /category/add/${id}
// @desc Add subcategory
// @access Admin only
router.patch("/category/add/:id", checkAdmin, addSubCategory);

// @route PATCH /category/delete/${id}
// @desc Delete subcategory
// @access Admin only
router.patch("/category/delete/:id", checkAdmin, deleteSubCategory);

// @route POST /brand
// @desc Add brand
// @access Admin only
router.post("/brand", checkAdmin, addBrand);

// @route GET /brand
// @desc Get all brands
// @access Admin only
router.get("/brand", checkAdmin, getAllBrands);

export default router;
