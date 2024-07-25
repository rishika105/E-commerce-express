const Category = require("../models/category.model");

//create category
exports.createNewCategory = async (req, res) => {
  //read the req body
  //create the category object
  const category_data = {
    name: req.body.name,
    description: req.body.description,
  };

  if (!req.body.name || !req.body.description) {
    res.status(400).send({
      message: "Fields are empty",
    });
  }

  //insert into mongo db
  try {
    const category = await Category.create(category_data);
    //return the response of the created category
    return res.status(201).send(category);
  } catch (err) {
    console.log("Error while creating the category", err);
    return res.status(500).send({
      message: "Error in creating category",
    });
  }
};

//update an existing category
exports.updateCategory = async (req, res) => {
  try {
    //check if fields are empty
    if (!req.body.name || !req.body.description) {
      res.status(400).send({
        message: "Fields are empty",
      });
    }
    //create a category object that is fetche from user i.e updated one
    const updatedCategoryData = {
      name: req.body.name,
      description: req.body.description,
    };

    //fetch id of the category
    const categoryId = req.params.id;

    //fetch existing category data from db
    const existingCategory = await Category.findById(categoryId);

     //check if category exists
     //if we do not find the updated category id in the db or if existing category does not exist
     if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not Found",
        
      });
    }

    //check if old data and new data are same
    if (
      existingCategory.name == updatedCategoryData.name &&
      existingCategory.description == updatedCategoryData.description
    ) {
      return res.status(400).json({
        success: false,
        message: "No changed detected",
      });
    }

    //update changes in db
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updatedCategoryData,
      { new: true } // Return the updated document
    );

    //return response
    return res.status(200).send({
      message: "Category updated successfully",
      data: updatedCategory,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

//get all category
exports.getAllCategory = async (req, res) => {};

//delete a category
exports.deleteCategory = async (req, res) => {};
