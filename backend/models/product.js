const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  sku: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category1: {
    type: String,
  },
  category2: {
    type: String,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("product", productSchema);
