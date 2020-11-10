const mongoose = require("mongoose");

// const itemSchema = mongoose.Schema(
//   {
//     products: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "product",
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       default: 1,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("item", itemSchema);

// const cartSchema = mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "user",
//     },
//     items: [],
//     subTotal: {
//       type: Number,
//       default: 0,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cart", cartSchema);
