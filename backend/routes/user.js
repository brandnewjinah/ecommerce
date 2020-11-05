const express = require("express");
const router = express.Router();

const { user_signup, user_login } = require("../controller/user");

//create
router.post("/signup", user_signup);
router.post("/login", user_login);

module.exports = router;
