const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Product = require("../models/Product");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Create Product (POST)
router.post("/create-product", upload.single("productImage"), async (req, res) => {
  try {
    const { name, price } = req.body;
    const imagePath = req.file ? req.file.path : "";

    const newProduct = new Product({
      name,
      price,
      productImage: imagePath,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created", product: newProduct });
  } catch (err) {
    console.error(" Error creating product:", err);
    res.status(500).json({ error: "Failed to create product" });
  }
});

// Get All Products (GET)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error(" Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

module.exports = router;
