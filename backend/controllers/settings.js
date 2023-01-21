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

//GET ONE CATEGORY
export const getACategory = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const category = await Category.findById(_id);
    res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ message: "Category doesn't exist" });
  }
};

//Update Category
export const updateCategory = async (req, res) => {
  const { id: _id } = req.params;
  const category = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No category with that id");

  const updatedCategory = await Category.findByIdAndUpdate(_id, category, {
    new: true,
  });
  console.log(updateCategory);
  res.status(200).json(updatedCategory);
};

//Add Sub Category
export const addSubCategory = async (req, res) => {
  const { id: _id } = req.params;
  const sub = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res
      .status(404)
      .send({ message: "Category doesn't exist with that Id" });

  const updatedCategory = await Category.findByIdAndUpdate(
    _id,
    { $push: { subCategory: sub } },
    {
      new: true,
    }
  );

  res.status(200).json(updatedCategory);
};

//Delete Sub Category
export const deleteSubCategory = async (req, res) => {
  const { id: _id } = req.params;
  const { subId } = req.query;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res
      .status(404)
      .send({ message: "Category doesn't exist with that Id" });

  const updatedCategory = await Category.findByIdAndUpdate(
    _id,
    { $pull: { subCategory: { _id: subId } } },
    {
      new: true,
    }
  );

  console.log(updatedCategory);

  res.status(200).json(updatedCategory);
};
