import mongoose from "mongoose";

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
