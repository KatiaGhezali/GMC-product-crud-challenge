const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    default: "",
  },
  inStock: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
