const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false , tableName: 'categories'
         
    /**
     * This helps you to provie a custom name to the table
     * If above is not provided, model name is converted into plural and set as the table name
     * 
     * If we want to just use the model name provided, we can provide the below option :
     * 
     * freezeTableName: true
     */

  }
);

module.exports = mongoose.model("Category", categorySchema);
