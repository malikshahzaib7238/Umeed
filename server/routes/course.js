const express = require('express');
const multer = require("multer");
const Course = require('../models/Course');
const router = express.Router();

const upload = multer(); // Multer middleware to handle FormData


// Create a new Course
router.post("/", upload.none(), async (req, res) => {
  console.log("This API got hit Course wali");

  try {
    console.log("Request Body: ", req.body);
    const { title, description, price, duration, skillLevel } = req.body;
    console.log("Received Course Data:", req.body);

    const course = new Course({
      title,
      description,
      price,
      duration,
      skillLevel
    });

    await course.save();

    res.status(201).json({ message: 'Course saved successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Error saving course', error });
  }
});

module.exports = router;
