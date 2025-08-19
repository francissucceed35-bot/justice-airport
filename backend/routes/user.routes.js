const express = require('express');
const router = express.Router();
// We are not using the User model for this test
// const User = require('../models/User.model.js'); 

// Route for customer registration TEST
router.post('/register', async (req, res) => {
  console.log("--- SIGNUP TEST: The /api/users/register route was successfully reached! ---");
  // Immediately send a success response
  res.status(201).json({ message: 'TEST SUCCESS: User created successfully' });
});

module.exports = router;
