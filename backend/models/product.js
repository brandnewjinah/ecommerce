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

const imgSchema = mongoose.Schema({
  id: Number,
  src: String,
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
  sku: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category1: {
    type: categorySchema,
    required: true,
  },
  category2: {
    type: selectSchema,
  },
  imgs: [imgSchema],
  size: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
