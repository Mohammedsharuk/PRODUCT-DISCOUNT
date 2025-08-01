const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema(
  {
    percentage: { type: Number, required: true, min: 1, max: 100 },
    validTill: { type: Date, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Discount", discountSchema);
