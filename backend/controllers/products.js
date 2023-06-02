import mongoose from "mongoose";
import Product from "../models/product.js";
import Brand from "../models/brand.js";
import cloudinary from "../middleware/cloudinary.js";

//GET PRODUCTS
export const getProducts = async (req, res) => {
  const category = req.query.category;
  const sub = req.query.sub;
  const sort = req.query.sort;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * pageSize;

  let sortBy =
    sort === "new"
      ? { createdAt: -1 }
      : sort === "asc"
      ? { price: 1 }
      : sort === "desc"
      ? { price: -1 }
      : null;

  try {
    if (category === "new") {
      let products = await Product.find()
        .populate("brand")
        .sort(sortBy)
        .limit(12);
      const totalCount = products.length;
      res.status(200).json({
        status: "success",
        totalCount,
        page,
        data: products,
      });
    } else if (category === "all") {
      let products = Product.find().populate("brand").sort(sortBy);

      const totalCount = await Product.countDocuments();
      const totalPages = Math.ceil(totalCount / pageSize);
      products = products.skip(skip).limit(pageSize);
      const result = await products;
      res.status(200).json({
        status: "success",
        totalCount,
        page,
        totalPages,
        data: result,
      });
    } else {
      if (sub !== undefined) {
        let products = Product.find({
          "category1.value": category,
          "category2.id": Number(sub),
        })
          .populate("brand")
          .sort(sortBy);
        const totalCount = await Product.countDocuments({
          "category1.value": category,
          "category2.id": Number(sub),
        });
        const totalPages = Math.ceil(totalCount / pageSize);
        products = products.skip(skip).limit(pageSize);
        const result = await products;
        res.status(200).json({
          status: "success",
          totalCount,
          page,
          totalPages,
          data: result,
        });
      } else {
        let products = Product.find({ "category1.value": category })
          .populate("brand")
          .sort(sortBy);
        const totalCount = await Product.countDocuments({
          "category1.value": category,
        });
        const totalPages = Math.ceil(totalCount / pageSize);
        products = products.skip(skip).limit(pageSize);
        const result = await products;
        res.status(200).json({
          status: "success",
          totalCount,
          page,
          totalPages,
          data: result,
        });
      }
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//GET ONE PRODUCT
export const getAProduct = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const product = await Product.findById(_id).populate("brand");
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
    }).limit(4);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//ADD PRODUCT
export const addProduct = async (req, res) => {
  const product = req.body;
  const image = req.body.image;
  const brand = req.body.brand;

  try {
    if (brand._id === "") {
      const newBrand = new Brand({ name: brand.name, value: brand.value });
      await newBrand.save();

      const uploadedResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "ecommerce",
      });

      const newProduct = new Product({
        ...product,
        brand: newBrand,
        image: uploadedResponse.url,
        price: {
          current: parseFloat(product.price.current),
          previous:
            product.price.previous !== ""
              ? parseFloat(product.price.previous)
              : 0,
        },
      });
      await newProduct.save();
      res.status(201).json(newProduct);
    } else {
      const uploadedResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "ecommerce",
      });
      const newProduct = new Product({
        ...product,
        image: uploadedResponse.url,
        price: {
          current: parseFloat(product.price.current),
          previous:
            product.price.previous !== ""
              ? parseFloat(product.price.previous)
              : 0,
        },
      });
      await newProduct.save();
      res.status(201).json(newProduct);
    }
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
