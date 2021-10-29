import express from "express";
import { signin, signup } from "../controllers/user.js";

const router = express.Router();

//create
router.post("/login", signin);
router.post("/signup", signup);

// //google
// router.post("/googlelogin", user_googlelogin);

// //read
// router.get("/", user_all);
// router.get("/:userId", user_each);

// //update
// router.put("/:userId", user_update);

export default router;
