const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
// const Account = require('./models/Account');
const AccountDetails = require('./models/AccountDetails');

const router = express.Router();

// Profile setup endpoint
router.post('/setup-profile', async (req, res) => {
  try {
    const { userId, name, gender, age, location, description, skills, mentorAvailable } = req.body;

    // Create profile details
    const accountDetails = new AccountDetails({
      userId,
      name,
      gender,
      age,
      location,
      description,
      skills,
      mentorAvailable,
    });

    // Save profile details
    await accountDetails.save();

    // Link profile to account
    const account = await Account.findById(userId);
    account.profile = accountDetails._id;
    await account.save();

    res.status(201).json({ message: 'Profile setup successful', profile: accountDetails });
  } catch (error) {
    res.status(500).json({ message: 'Error setting up profile', error });
  }
});

module.exports = router;
