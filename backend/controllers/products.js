import mongoose from "mongoose";
import Product from "../models/product.js";
import cloudinary from "../middleware/cloudinary.js";

//GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  const category = req.query.category;
  const newProducts = req.query.new;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * pageSize;

  try {
    if (newProducts) {
      let products = await Product.find().sort({ createdAt: -1 }).limit(8);
      res.status(200).json(products);
    } else if (category === "all") {
      let products = Product.find();
      const total = await Product.countDocuments();
      const pages = Math.ceil(total / pageSize);
      products = products.skip(skip).limit(pageSize);
      const result = await products;
      res.status(200).json({
        status: "success",
        count: result.length,
        page,
        pages,
        data: result,
      });
    } else if (category && category !== "all") {
      let products = Product.find({ "category1.value": category });
      const total = await Product.countDocuments({
        "category1.value": category,
      });
      const pages = Math.ceil(total / pageSize);
      products = products.skip(skip).limit(pageSize);
      const result = await products;
      res.status(200).json({
        status: "success",
        count: result.length,
        page,
        pages,
        data: result,
      });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//GET ONE PRODUCT
export const getAProduct = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const product = await Product.findById(_id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Product doesn't exist" });
  }
};

//GET SIMILAR PRODUCTS
export const getSimilarProducts = async (req, res) => {
  const similar = req.query.similar;
  const { id: _id } = req.params;

  try {
    const products = await Product.find({
      "category2.id": similar,
      _id: { $ne: _id },
    }).limit(3);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//ADD PRODUCT
export const addProduct = async (req, res) => {
  const product = req.body;
  const image = req.body.img;

  try {
    const uploadedResponse = await cloudinary.uploader.upload(image, {
      upload_preset: "ecommerce",
    });
    const newProduct = new Product({ ...product, img: uploadedResponse.url });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  const { id: _id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No product with that id");

  const updatedProduct = await Product.findByIdAndUpdate(_id, product, {
    new: true,
  });

  res.status(200).json(updatedProduct);
};

//DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No product with that id");

  await Product.findByIdAndRemove(_id);

  res.status(204).json({ message: "Product deleted" });
};

//DELETE MANY PRODUCTS
export const deleteManyProducts = async (req, res) => {
  const ids = req.body;

  try {
    await Product.deleteMany({
      _id: ids,
    });
    res.status(204).json({ message: "Products deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
