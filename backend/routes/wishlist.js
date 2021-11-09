import express from "express";
import { checkAuth, checkToken } from "../middleware/checkAuth.js";
import { addWishlist, getWishlist } from "../controllers/wishlist.js";

const router = express.Router();

//create
router.post("/:id", checkToken, addWishlist);
router.get("/:id", checkToken, getWishlist);

export default router;
