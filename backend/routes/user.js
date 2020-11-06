const express = require("express");
const router = express.Router();

const {
  user_signup,
  user_login,
  user_all,
  user_each,
  user_update,
} = require("../controller/user");

//create
router.post("/signup", user_signup);
router.post("/login", user_login);

//read
router.get("/", user_all);
router.get("/:userId", user_each);

//update
router.put("/:userId", user_update);

module.exports = router;
