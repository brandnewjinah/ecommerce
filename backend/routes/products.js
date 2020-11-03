const express = require("express");
const router = express.Router();

const {
  product_post_product,
  product_get_all,
  product_get_product,
  product_update_product,
  product_delete_all,
  product_delete_product,
} = require("../controller/product");

//import controller

//create
router.post("/", product_post_product);

//get
router.get("/", product_get_all);
router.get("/:productId", product_get_product);

//update
router.put("/:productId", product_update_product);

//delete
router.delete("/", product_delete_all);
router.delete("/:productId", product_delete_product);

module.exports = router;
