import mongoose from "mongoose";

const selectSchema = mongoose.Schema({
  id: Number,
  label: String,
  value: String,
});

const categorySchema = mongoose.Schema({
  id: Number,
  label: String,
  value: String,
  subcategory: [selectSchema],
});

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    currency: {
      type: String,
      default: "$",
    },
    current: {
      type: Number,
      required: true,
    },
    previous: {
      type: Number,
    },
  },
  size: String,
  category1: {
    type: categorySchema,
    required: true,
  },
  category2: {
    type: selectSchema,
  },
  img: {
    type: String,
  },
  description: {
    type: String,
  },
  sku: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
