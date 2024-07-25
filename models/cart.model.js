const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    cost: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
    versionKey: false,
    tableName: "cart",
  }
);

module.exports = mongoose.model("Cart", cartSchema);
