const Category = require("../models/Category");

const addCategory = async (req, res) => {
  try {
    const newCategory = await new Category(req.body);
    const category = await newCategory.save();
    if (category) {
      res.status(200).send(category);
    } else {
      res.status(400).send("Something Wrong");
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories) {
      res.status(200).send(categories);
    } else {
      res.status(404).send("Data Not Found");
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      await Category.updateOne({ _id: category.id }, req.body, {
        returnOriginal: true,
      });
      res.status(200).send(category);
    } else {
      res.status(400).send("Category Not Found");
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      await Category.deleteOne({ _id: category.id });
      res.status(200).send(category);
    } else {
      res.status(400).send("Category Not Found");
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  deleteCategory,
  addCategory,
  getAllCategories,
  updateCategory,
};
