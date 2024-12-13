const express = require('express');
const multer = require("multer");
const Product = require('../models/Product');
const router = express.Router();

const upload = multer(); // Multer middleware to handle FormData


// Create a new product
router.post("/", upload.none(), async (req, res) => {
  console.log("This API got hit Products wali");

  try {
    console.log("Request Body: ", req.body);
    const { name, description, price, category, image } = req.body;
    console.log("Received Product Data:", req.body);

    const product = new Product({
      name,
      description,
      price,
      category,
      image
    });

    await product.save();

    res.status(201).json({ message: 'Product saved successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error saving product', error });
  }
});

module.exports = router;
