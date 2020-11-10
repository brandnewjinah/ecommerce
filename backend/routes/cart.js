const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

const { cart_add } = require("../controller/cart");

//create
router.post("/", checkAuth, cart_add);

module.exports = router;
