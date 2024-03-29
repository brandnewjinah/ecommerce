import mongoose from "mongoose";

const selectSchema = mongoose.Schema({
  id: Number,
  name: String,
  value: String,
});

const categorySchema = mongoose.Schema({
  id: Number,
  name: String,
  value: String,
  subcategory: [selectSchema],
});

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
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
  size: {
    type: String,
  },
  category1: {
    type: categorySchema,
    required: true,
  },
  category2: {
    type: selectSchema,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
