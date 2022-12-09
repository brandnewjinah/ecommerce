import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        brand: {
          type: String,
        },
        qty: {
          type: Number,
          required: true,
        },
        price: { type: String, required: true },
        img: {
          type: String,
        },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    shipping: {
      fullName: {
        type: String,
        required: true,
      },
      streetAddress: {
        type: String,
        required: true,
      },
      streetAddress2: {
        type: String,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zip: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
      },
    },
    payment: {
      fullName: {
        type: String,
        required: true,
      },
      cardNumber: {
        type: String,
        required: true,
      },
      expiration: {
        type: String,
        required: true,
      },
      cvc: {
        type: String,
        required: true,
      },
    },
    delivery: {
      shipping: {
        type: String,
        required: true,
      },
    },
    total: {
      type: Number,
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderStatus: {
      type: String,
      default: "Order Placed",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
