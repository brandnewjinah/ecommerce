import express from "express";

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

// @route GET
// @desc View all products
// @access Public
router.get("/", getProducts);

router.get("/:id", getAProduct);
router.get("/similar/:id", getSimilarProducts);
router.post("/", addProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.patch("/", deleteManyProducts);

export default router;
