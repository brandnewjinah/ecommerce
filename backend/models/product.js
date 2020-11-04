const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  brand: {
    type: String,
  },
});

module.exports = mongoose.model("product", productSchema);
