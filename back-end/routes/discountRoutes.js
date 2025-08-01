const express = require("express");
const router = express.Router();
const Discount = require("../models/Discount");

// Create a discount
router.post("/create", async (req, res) => {
  try {
    const { percentage, validTill, productId } = req.body;

    const newDiscount = new Discount({ percentage, validTill, productId });
    await newDiscount.save();

    res.status(201).json({ message: "Discount created", discount: newDiscount });
  } catch (err) {
    console.error("❌ Error creating discount:", err);
    res.status(500).json({ error: "Failed to create discount" });
  }
});

// Get all discounts with product details
router.get("/", async (req, res) => {
  try {
    const discounts = await Discount.find().populate("productId");
    res.json(discounts);
  } catch (err) {
    console.error("❌ Error fetching discounts:", err);
    res.status(500).json({ error: "Failed to fetch discounts" });
  }
});

module.exports = router;
