const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config(); // optional, for environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve uploaded images

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/project_milestone", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
const productRoutes = require("./routes/productRoutes");
const discountRoutes = require("./routes/discountRoutes");

app.use("/products", productRoutes);
app.use("/discounts", discountRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("🚀 Product Discount Backend is Running");
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
