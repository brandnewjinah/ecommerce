import express from "express";
import { checkAuth, checkToken } from "../middleware/checkAuth.js";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlist.js";

const router = express.Router();

// @route GET /
// @desc View all wishlist products that belong to a user
// @access Private
router.get("/", checkToken, getWishlist);

// @route GET /wishlist/addToWishlist?productId=${productId}
// @desc Add a product to the wishlist
// @access Private
router.get("/addToWishlist", checkToken, addToWishlist);

// @route GET /wishlist/removeFromWishlist?productId=${productId}
// @desc Remove a product from the wishlist
// @access Private
router.get("/removeFromWishlist", checkToken, removeFromWishlist);

export default router;
