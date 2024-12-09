const Account = require("../models/Account"); // Use your existing Account model
const express = require('express')
const router = express.Router();
router.get("/get", async (req, res) => {
  try {
    // Fetch data from the Account schema
    console.log("This API got hit network wali");
    const accounts = await Account.find();
    console.log(accounts);

    // Transform data to match the required networkData structure
    const networkData = accounts.map((account) => ({
      id: account._id, // Assuming `Account` schema has an `_id` field
      name: account.username || "Anonymous", // Replace with your schema's field names
      role: account.description || "Role Not Defined",
      location: account.location || "Unknown",
      expertise: account.expertise || [], // Ensure expertise is an array
      mentorAvailable: account.mentorAvailable || false,
      connections: account.connections || 0,
      verifiedSkills: account.skills || [],
    }));

    res.status(200).json(networkData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch network data" });
  }
});



module.exports = router