import express from "express";
import { checkAdmin } from "../middleware/checkAuth.js";
import {
  getProducts,
  searchProduct,
  searchBrand,
} from "../controllers/search.js";

const router = express.Router();

// @route GET /products
// @desc View all products
// @access Public
// router.get("/", getProducts);

// @route GET /search
// @desc search products
// @access Public
router.get("/product", searchProduct);

// @route GET /search
// @desc search brand
// @access Private
router.get("/brand", checkAdmin, searchBrand);

export default router;
