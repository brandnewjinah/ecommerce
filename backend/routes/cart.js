const express = require("express");
const router = express.Router();

const { cart_add } = require("../controller/cart");

//create
router.post("/", cart_add);

module.exports = router;
