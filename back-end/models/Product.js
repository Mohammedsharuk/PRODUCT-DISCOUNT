const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    productImage: { type: String }, // e.g., "uploads/image123.jpg"
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
