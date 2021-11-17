import express from "express";
import { checkAuth, checkToken } from "../middleware/checkAuth.js";
import {
  addAnnouncement,
  getAnnouncement,
} from "../controllers/announcement.js";

const router = express.Router();

// @route POST /announcement
// @desc Create a new announcement
// @access Private
router.post("/", addAnnouncement);

// @route GET /announcement
// @desc Get all announcements created
// @access Private
router.get("/", getAnnouncement);

export default router;
