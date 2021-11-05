import mongoose from "mongoose";
import Product from "../models/product.js";

//GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  const category = req.query.category;

  try {
    let products;

    if (category) {
      products = await Product.find({ "category1.value": category });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
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

  const newProduct = new Product(product);

  try {
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//EDIT PRODUCT
export const updateProduct = async (req, res) => {
  const { id: _id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No product with that id");

  const updatedProduct = await Product.findByIdAndUpdate(_id, product, {
    new: true,
  });

  res.json(updatedProduct);
};

//DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No product with that id");

  await Product.findByIdAndRemove(_id);

  res.json({ message: "Product deleted" });
};

//DELETE MANY PRODUCTS
export const deleteManyProducts = async (req, res) => {
  const ids = req.body;

  try {
    await Product.deleteMany({
      _id: ids,
    });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
