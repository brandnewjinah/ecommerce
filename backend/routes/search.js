import express from "express";
import { getProducts, searchProduct } from "../controllers/search.js";

const router = express.Router();

// @route GET /products
// @desc View all products
// @access Public
// router.get("/", getProducts);

// @route GET /search
// @desc search products
// @access Public
router.get("/", searchProduct);

export default router;
