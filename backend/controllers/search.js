import mongoose from "mongoose";
import Product from "../models/product.js";

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
      let products = await Product.find().sort(sortBy).limit(12);
      const totalCount = products.length;
      res.status(200).json({
        status: "success",
        totalCount,
        page,
        data: products,
      });
    } else if (category === "all") {
      let products = Product.find().sort(sortBy);

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
        }).sort(sortBy);
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
        let products = Product.find({ "category1.value": category }).sort(
          sortBy
        );
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

//SEARCH PRODUCT
export const searchProduct = async (req, res) => {
  const { query } = req.query;
  const page = 1;

  try {
    let regex = new RegExp(query, "i");

    let products = await Product.find({
      $or: [{ name: { $in: [regex] } }, { brand: { $in: [regex] } }],
    });

    const totalCount = products.length;
    res.status(200).json({
      status: "success",
      totalCount,
      page,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ message: "Product doesn't exist" });
  }
};
