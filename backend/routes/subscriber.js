import express from "express";
import { getAllSubscribers, addSubscriber } from "../controllers/subscriber.js";
import { checkAdmin } from "../middleware/checkAuth.js";

const router = express.Router();

// @route POST
// @desc Add a new subscriber
// @access Public
router.post("/", addSubscriber);

// @route GET /
// @desc Get all user information
// @access Private
router.get("/", checkAdmin, getAllSubscribers);

export default router;
