import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  subCategory: [
    {
      name: {
        type: String,
      },
      value: {
        type: String,
      },
    },
  ],
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
