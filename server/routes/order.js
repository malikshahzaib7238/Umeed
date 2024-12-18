const express = require('express');
const multer = require("multer");
const Order = require('../models/Order');
const router = express.Router();

const upload = multer(); // Multer middleware to handle FormData


// POST: Save a new order
router.post("/", upload.none(), async (req, res) =>  {

    console.log("This API got hit Orders wali");

    try {
      const { items, date, total } = req.body;
  
      // Validate incoming data
      if (!items || !date || !total) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      // Save to database
      const newOrder = new Order({ items, date, total });
      await newOrder.save();
  
      res.status(201).json({ message: "Order saved successfully", order: newOrder });
    } catch (error) {
      console.error("Error saving order:", error);
      res.status(500).json({ error: "Failed to save the order" });
    }
  });
  
  // GET: Fetch all orders
  router.get("/", async (req, res) => {

    console.log("This API got hit Order GET wali");

    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });
  
  module.exports = router;