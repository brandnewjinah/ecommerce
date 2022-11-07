import express from "express";
import { getAllSubscribers, addSubscriber } from "../controllers/subscriber.js";
import { checkAdmin } from "../middleware/checkAuth.js";

const router = express.Router();

// @route POST /subscribers
// @desc Add a new subscriber
// @access Public
router.post("/", addSubscriber);

// @route GET /subscribers
// @desc Get all user information
// @access Private
router.get("/", checkAdmin, getAllSubscribers);

export default router;
