const express = require('express');
const multer = require("multer");
const Order = require('../models/Order');
const router = express.Router();

const upload = multer(); // Multer middleware to handle FormData


// POST: Save a new order
router.post("/", upload.none(), async (req, res) => {

  console.log("This API got hit Orders wali");

  try {
    const { userId, items, date, total } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Validate incoming data
    if (!items || !date || !total) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Save to database
    const newOrder = new Order({ userId, items, date, total });
    await newOrder.save();

    res.status(201).json({ message: "Order saved successfully", order: newOrder });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Failed to save the order" });
  }
});
router.delete("/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Find and delete the order, ensuring it belongs to the correct user
    const deletedOrder = await Order.findOneAndDelete({ _id: orderId, userId });

    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found or unauthorized" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Failed to delete order" });
  }
});
// GET: Fetch all orders
router.get("/", async (req, res) => {

  console.log("This API got hit Order GET wali");
  // Extract the userId from the query parameters (or headers, if needed)
  const { userId } = req.query;
  console.log("User Id from Req Params: ", userId);

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  try {
    const orders = await Order.find({ userId });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;