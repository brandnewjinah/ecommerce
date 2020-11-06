const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

const {
  product_post_product,
  product_get_all,
  product_get_product,
  product_update_product,
  product_delete_all,
  product_delete_product,
} = require("../controller/product");

//create
router.post("/", checkAuth, product_post_product);

//get
router.get("/", product_get_all);
router.get("/:productId", product_get_product);

//update
router.put("/:productId", checkAuth, product_update_product);

//delete
router.delete("/", checkAuth, product_delete_all);
router.delete("/:productId", checkAuth, product_delete_product);

module.exports = router;
