const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      qty: Number,
      required: true,
    },
  ],
  shipping: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("order", orderSchema);
