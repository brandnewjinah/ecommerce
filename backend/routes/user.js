import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import { updateUser } from "../controllers/user.js";

const router = express.Router();

//create

router.put("/:id", checkAuth, updateUser);

// //google
// router.post("/googlelogin", user_googlelogin);

// //read
// router.get("/", user_all);
// router.get("/:userId", user_each);

// //update
// router.put("/:userId", user_update);

export default router;
