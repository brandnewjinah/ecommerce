import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        price: { type: Number, required: true },
        imgs: [
          {
            id: Number,
            src: String,
          },
        ],
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
      address1: {
        type: String,
        required: true,
      },
      address2: {
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
      billingFirstName: {
        type: String,
        required: true,
      },
      billingLastName: {
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
      security: {
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
    status: {
      type: String,
      default: "Order Placed",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
