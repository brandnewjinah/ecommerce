import mongoose from "mongoose";
import Category from "../models/category.js";

//ADD CATEGORY
export const addCategory = async (req, res) => {
  const category = req.body;

  try {
    const newCategory = new Category(category);
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET ALL CATEGORIES
export const getAllCategories = async (req, res) => {
  try {
    let categories = Category.find();
    const result = await categories;
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
